// Import caccl
import initCACCL from 'caccl/client/cached';

// Import React
import React, { Component } from 'react';

// Import other components
import ItemList from './shared/ItemList';
import LoadingSpinner from './shared/LoadingSpinner';

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
      // The launchInfo object from the LTI launch
      launchInfo: null,
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
        // TODO: once caccl is updated, switch to "metadata" instead of "custom_metadata"
        const metadataString = customParams.custom_metadata;
        configuration = JSON.parse(metadataString);
      } catch (err) {
        configuration = {};
      }
    }

    // TODO: add step validating the configuration (make sure all values are there and each value is of the right type and that there is at least one assignment group checked)
    // NOTE: grace period must be 0 or positive integer (not float)
    // NOTE: late days per sem/assignment integer, positive
    // NOTE: at least one assignment group

    // Store state
    this.setState({
      configuration,
      loading: false,
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
