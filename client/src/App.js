// Import caccl
import initCACCL from 'caccl/client/cached';

// Import React
import React, { Component } from 'react';

// Import other components
import ItemList from './shared/ItemList';
import LoadingSpinner from './shared/LoadingSpinner';
import SetupErrorMessage from './Body/NotSetUp/SetupErrorMessage';
import Configuration from './Body/Configuration';

// Import styles
import './App.css';

// Import metadataId
import metadataId from './METADATA_ID';

// Initialize caccl
const { api, getStatus } = initCACCL();

class App extends Component {
  /**
   * Initialize App component
   */
  constructor(props) {
    super(props);

    // Set up state
    this.state = {
      // If true, the app is still loading
      loading: true,
      // If defined, an error has occurred and this is the error message
      errorMessage: null,
      // The current app configuration object
      configuration: null,
      // If true, the app's configurations are set properly
      configurationSet: false,
      // The launchInfo object from the LTI launch
      launchInfo: null,
      // Array of assignment groups from the course
      assignmentGroups: null,
      // TODO: add assignmentGroups to state and load them in componentDidMount
    };
  }

  /**
   * Called when the component mounted, pulls state and user profile from server
   */
  async componentDidMount() {
    let launchInfo;
    // Load status
    try {
      // Get status from server
      const status = await getStatus();

      // > App wasn't launched via Canvas
      if (!status.launched) {
        return this.setState({
          errorMessage: 'Please launch this app from Canvas.',
        });
      }

      // > App is not authorized
      if (!status.authorized) {
        return this.setState({
          errorMessage: 'We don\'t have access to Canvas. Please re-launch the app.',
        });
      }

      // Save the launch info
      ({ launchInfo } = status);
      console.log(launchInfo);
    } catch (err) {
      return this.setState({
        errorMessage: `Error while requesting state from server: ${err.message}`,
      });
    }

    // Save launch info
    this.setState({
      launchInfo,
    });

    // Load from Canvas
    await this.updateFromCanvas();
  }

  async onNewMetadata(newMetadata) {
    const { launchInfo } = this.state;
    this.setState({
      loading: true,
    });
    await api.course.app.updateMetadata({
      courseId: launchInfo.courseId,
      metadata_id: metadataId,
      metadata: newMetadata,
    });

    const testing = await api.course.app.getMetadata({
      metadata_id: metadataId,
      courseId: launchInfo.courseId,
    });
    console.log(testing);
    this.setState({
      loading: false,
    });
  }

  /**
   * Pull configuration and late day counts from Canvas
   */
  async updateFromCanvas() {
    // Set app as loading
    this.setState({
      loading: true,
    });

    // Get launchInfo from state
    const { launchInfo } = this.state;

    // Try to get configuration
    let configuration;
    // > Try to pull from Canvas if the user is a teaching team member
    if (!launchInfo.isLearner) {
      try {
        configuration = await api.course.app.getMetadata({
          metadataId,
          courseId: launchInfo.courseId,
        });
      } catch (err) {
        // Ignore this
      }
    }
    // > If we couldn't get metadata, try to get it out of launchInfo
    if (!configuration || Object.keys(configuration).length === 0) {
      try {
        const { customParams } = launchInfo;
        const metadataString = customParams.metadata;
        configuration = JSON.parse(metadataString);
      } catch (err) {
        configuration = {};
      }
    }

    let assignmentGroups;
    // > Try to load assignmentGroups
    try {
      assignmentGroups = await api.course.assignmentGroup.list({
        courseId: launchInfo.courseId,
      });
    } catch (err) {
      // Ignore this
    }

    // Deconstruct configuration
    const {
      gracePeriodMin,
      maxLateDaysPerSemester,
      maxLateDaysPerAssignment,
      assignmentGroupIdsToCount,
    } = configuration;

    // Make sure configuration is valid
    const configurationSet = (
      // Make sure all options exist
      gracePeriodMin
      && maxLateDaysPerAssignment
      && maxLateDaysPerSemester
      && assignmentGroupIdsToCount
      // Make sure they have the right types
      && Number.isInteger(gracePeriodMin)
      && Number.isInteger(maxLateDaysPerAssignment)
      && Number.isInteger(maxLateDaysPerSemester)
      && Array.isArray(assignmentGroupIdsToCount)
      // Make sure the numbers are in the proper range
      && gracePeriodMin >= 0
      && maxLateDaysPerAssignment > 0
      && maxLateDaysPerSemester > 0
      // Make sure caps make sense
      && maxLateDaysPerSemester >= maxLateDaysPerAssignment
      // Make sure there is at least one assignment group selected
      && assignmentGroupIdsToCount.length >= 1
    );

    // Store state
    this.setState({
      configuration,
      configurationSet,
      loading: false,
      assignmentGroups,
    });
  }

  /**
   * Render the App
   */
  render() {
    // Deconstruct the state
    const {
      configuration,
      loading,
      errorMessage,
      configurationSet,
      launchInfo,
      assignmentGroups,
    } = this.state;

    // Error message
    if (errorMessage) {
      return (
        <div className="alert alert-warning">
          <div>
            <strong>Oops! An error occurred:</strong>
          </div>
          {errorMessage}
        </div>
      );
    }

    // Loading spinner
    if (loading) {
      return (
        <LoadingSpinner />
      );
    }

    // Deconstruct configuration
    const {
      gracePeriodMin,
      maxLateDaysPerSemester,
      maxLateDaysPerAssignment,
      assignmentGroupIdsToCount,
    } = configuration;
    const { courseId } = launchInfo;

    if (!configurationSet && launchInfo.isLearner) {
      return (
        <SetupErrorMessage />
      );
    }
    if (!configurationSet) {
      return (
        <Configuration
          initialGracePeriodMin={gracePeriodMin}
          initialMaxLateDaysPerSemester={maxLateDaysPerSemester}
          initialMaxLateDaysPerAssignment={maxLateDaysPerAssignment}
          initialAssignmentGroupIdsToCount={assignmentGroupIdsToCount}
          assignmentGroups={assignmentGroups}
          courseId={courseId}
          onNewMetadata={(newMetadata) => {
            this.onNewMetadata(newMetadata);
          }}
        />
      );
    }

    const testDateOne = new Date('November 8 2019 05:35:32');
    const testDateTwo = new Date('November 7 2019 05:35:32');

    // Render the component
    return (
      <div>
        <ItemList
          items={[
            {
              name: 'Bert Alina',
              value: 2,
              onClick: () => {
                alert('Person 1 clicked');
              },
              dueAt: testDateOne,
            },
            {
              name: 'Alex Timo',
              value: 6,
              onClick: () => {
                alert('Person 2 clicked');
              },
              dueAt: testDateTwo,
            },
          ]}
          nameHeader="Full Name"
          valueHeader="Late Days Used"
          dueAtHeader="Due At"
          valueDenominator={5}
          valueSuffix="Used"
          showDueAt
          footerMessage="Click a student for their assignment breakdown"
        />
      </div>
    );
  }
}

export default App;
