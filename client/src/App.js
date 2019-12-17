// Import caccl
import initCACCL from 'caccl/client/cached';

// Import React
import React, { Component } from 'react';

// Import other components
import ItemList from './shared/ItemList';
import LoadingSpinner from './shared/LoadingSpinner';
import NotSetUp from './Body/NotSetUp';
import Configuration from './Body/Configuration';
import StudentSummary from './Body/shared/StudentSummary';
import LateDaysByStudentView from './Body/InstructorDashboard/LateDaysByStudentView';
import Header from './Header';

// Import styles
import './App.css';

// Import metadata_id
// eslint-disable-next-line camelcase
import metadata_id from './METADATA_ID';

// Views
const VIEWS = {
  // Views for TTMs:
  TTM_HOME: 'ttm-home',
  CONFIGURATION: 'configuration',
  LATE_DAYS_BY_STUDENT: 'late-days-by-student',
  LATE_DAYS_BY_ASSIGNMENT: 'late-days-by-assignment',
  TTM_VIEW_OF_SPECIFIC_STUDENT: 'ttm-view-of-specific-student',
  // Views for students:
  STUDENT_HOME: 'student-home',
  NOT_SET_UP: 'not-set-up',
};

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
      // If true, the current user is a student
      isStudent: false,
      // If defined, an error has occurred and this is the error message
      errorMessage: null,
      // The current app configuration object
      configuration: null,
      // The courseId the user launched from
      courseId: null,
      // The hostname of Canvas
      canvasHost: null,
      // The custom parameters from the launch
      customParams: null,
      // Array of assignment groups from the course
      assignmentGroups: null,
      // List of students in the course (if this is an instructor)
      students: null,
      // Current selected student to display
      currentSelectedStudent: null,
      // The current view to display
      currentView: null,
      // Map of late days used { canvasId => { assignmentId => num days used } }
      lateDaysMapForEveryone: {},
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
    } catch (err) {
      return this.setState({
        errorMessage: `Error while requesting state from server: ${err.message}`,
      });
    }

    // Process the launchInfo
    const { canvasHost } = launchInfo;

    // Process the launchInfo
    const isStudent = launchInfo.isLearner;
    const { courseId, customParams } = launchInfo;

    // Load students if the current user is a teaching team member
    let students = null;
    if (!isStudent) {
      try {
        students = await api.course.listStudents({ courseId });
      } catch (err) {
        return this.setState({
          errorMessage: `Error while getting the list of students in the course: ${err.message}`,
        });
      }
    }

    // Save launch info
    this.setState({
      courseId,
      canvasHost,
      isStudent,
      customParams,
      students,
    });

    // Load from Canvas
    await this.updateFromCanvas();
  }

  async onNewMetadata(newMetadata) {
    const { courseId } = this.state;
    this.setState({
      loading: true,
    });
    await api.course.app.updateMetadata({
      metadata_id,
      courseId,
      metadata: newMetadata,
    });

    this.setState({
      configurationSet: true,
      configuration: newMetadata,
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

    // Deconstruct state
    const { isStudent, courseId } = this.state;

    // Try to get configuration
    let configuration;
    // > Try to pull from Canvas if the user is a teaching team member
    if (!isStudent) {
      try {
        configuration = await api.course.app.getMetadata({
          metadata_id,
          courseId,
        });
      } catch (err) {
        // Ignore this
      }
    }

    // > If we couldn't get metadata, try to get it out of launchInfo
    if (!configuration || Object.keys(configuration).length === 0) {
      try {
        const { customParams } = this.state;
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
        courseId,
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

    let studentList;
    // TODO: load late day counts from Canvas and store them in the state
    try {
      studentList = await api.course.listStudents({
        courseId,
      });
    } catch (err) {
      // Ignore tis
    }
    // Determine the current view
    let currentView;
    if (isStudent) {
      currentView = (
        configurationSet
          ? VIEWS.STUDENT_HOME
          : VIEWS.NOT_SET_UP
      );
    } else {
      currentView = (
        configurationSet
          ? VIEWS.TTM_HOME
          : VIEWS.CONFIGURATION
      );
    }

    // Store state
    this.setState({
      configuration,
      assignmentGroups,
      // currentView, // TODO: put back
      currentView: VIEWS.TTM_VIEW_OF_SPECIFIC_STUDENT, // TODO: remove
      currentSelectedStudent: this.state.students[0], // TODO: remove
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
      currentView,
      currentSelectedStudent,
      courseId,
      canvasHost,
      assignmentGroups,
    } = this.state;
    console.log(currentView);

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

    let body;
    let backButton;
    if (currentView === VIEWS.NOT_SET_UP) {
      body = (
        <NotSetUp />
      );
    }

    if (currentView === VIEWS.CONFIGURATION) {
      const {
        gracePeriodMin,
        maxLateDaysPerSemester,
        maxLateDaysPerAssignment,
        assignmentGroupIdsToCount,
      } = configuration;

      body = (
        <Configuration
          assignmentGroups={assignmentGroups}
          courseId={courseId}
          onNewMetadata={(newMetadata) => {
            this.onNewMetadata(newMetadata);
          }}
        />
      );
    }

    if (currentView === VIEWS.LATE_DAYS_BY_STUDENT) {
      const {
        gracePeriodMin,
        maxLateDaysPerSemester,
        maxLateDaysPerAssignment,
        assignmentGroupIdsToCount,
      } = configuration;

      body = (
        <LateDaysByStudentView
          profile={currentSelectedStudent}
          maxLateDaysPerAssignment={maxLateDaysPerAssignment}
          maxLateDaysPerSemester={maxLateDaysPerSemester}
          assignments={studentList}
        />
      );
    }

    if (
      // currentView === VIEWS.STUDENT_HOME
      // || currentView === VIEWS.TTM_VIEW_OF_SPECIFIC_STUDENT
      true
    ) {
      const testDateOne = new Date('November 8 2019 05:35:32');
      const testDateTwo = new Date('November 7 2019 05:35:32');
      const testDateThree = new Date('November 7 2019 05:35:32');
      body = (
        <StudentSummary
          profile={currentSelectedStudent}
          maxLateDaysPerAssignment={2}
          maxLateDaysPerSemester={4}
          assignments={[
            {
              name: 'Homework 1',
              id: 1,
              dueAt: testDateOne,
              value: 2,
            },
            {
              name: 'Homework 2',
              id: 2,
              dueAt: testDateTwo,
              value: 2,
            },
            {
              name: 'Homework 3',
              id: 3,
              dueAt: testDateThree,
              value: 1,
            },
          ]}
          lateDaysMap={{
            1: 2,
            2: 2,
            3: 1,
          }}
          valueSuffix="Used"
          totalLateDaysUsed={4}
          nameHeader="Full Name"
          valueHeader="Late Days Used"
          dueAtHeader="Due At"
          courseId={courseId}
          canvasHost={canvasHost}
          showDueAt
          showGetInTouch={(currentView === VIEWS.TTM_VIEW_OF_SPECIFIC_STUDENT)}
        />
      );
    }

    // Render the component
    return (
      <div className="app-container">
        <Header leftButton={backButton} />
        <div className="content-below-header">
          {body}
        </div>
      </div>
    );
  }
}

export default App;
