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
      // The id of the current user
      userId: null,
      // If defined, an error has occurred and this is the error message
      errorMessage: null,
      // The current app configuration object
      configuration: null,
      // The courseId the user launched from
      courseId: null,
      // The hostname of Canvas
      canvasHost: null,
      // List of assignments that count toward the late day counts
      assignments: null,
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
    const { canvasHost, userId } = launchInfo;

    // Process the launchInfo
    const isStudent = launchInfo.isLearner;
    const { courseId, customParams } = launchInfo;

    // Load students if the current user is a teaching team member
    let students;
    if (isStudent) {
      // Only load the current student
      try {
        students = [await api.user.self.getProfile()];
      } catch (err) {
        return this.setState({
          errorMessage: `Error while getting your profile: ${err.message}`,
        });
      }
    } else {
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
      userId,
      canvasHost,
      isStudent,
      customParams,
      students,
    });

    // Load from Canvas
    await this.updateFromCanvas();
  }

  /**
   * Handler for when new metadata is provided
   * @param {object} newMetadata - the new metadata
   */
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
    const {
      isStudent,
      courseId,
      userId,
      students,
    } = this.state;

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
        return this.setState({
          loading: false,
          errorMessage: `While attempting to load app configuration, we ran into an error: ${err.message}`,
        });
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
      return this.setState({
        loading: false,
        errorMessage: `While attempting to load assignment groups, we ran into an error: ${err.message}`,
      });
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

    // Load all submissions
    let lateDaysMapForEveryone = null;
    let assignments = [];
    if (configurationSet) {
      // gracePeriodMin,
      // maxLateDaysPerSemester,
      // maxLateDaysPerAssignment,
      // assignmentGroupIdsToCount,

      // Get all the relevant assignment lists
      const assignmentLists = await Promise.all(
        assignmentGroupIdsToCount
          .map((assignmentGroupId) => {
            return api.course.assignmentGroup.get({
              courseId,
              assignmentGroupId,
              includeAssignments: true,
            })
              .then((assignmentGroup) => {
                return assignmentGroup.assignments;
              });
          })
      );

      // Turn into one long list of assignments
      assignments = [].concat(...assignmentLists);

      // Filter out assignments that do not have a due date
      assignments = assignments.filter((assignment) => {
        return assignment.due_at;
      });

      // Get submissions for each assignment (or just my submission if student)
      const submissionPacks = await Promise.all(
        assignments
          .map((assignment) => {
            const listSubs = (
              isStudent
                ? (
                  api.course.assignment.getSubmission({
                    courseId,
                    assignmentId: assignment.id,
                    studentId: userId,
                    excludeUser: true,
                  })
                    .then((sub) => {
                      return [sub];
                    })
                )
                : (
                  api.course.assignment.listSubmissions({
                    courseId,
                    assignmentId: assignment.id,
                  })
                )
            );

            // Turn subs into a pack with the assignmentId
            return listSubs.then((subs) => {
              return {
                assignmentId: assignment.id,
                submissions: subs,
              };
            });
          })
      );

      // Post process to create the lateDaysMapForEveryone
      lateDaysMapForEveryone = {};

      submissionPacks.forEach((pack) => {
        const { assignmentId, submissions } = pack;

        // Go through each assignment and calculate late days used
        submissions.forEach((sub) => {
          // Create student map if it isn't already there
          if (!lateDaysMapForEveryone[sub.user_id]) {
            lateDaysMapForEveryone[sub.user_id] = {};
          }

          // No late days used if not submitted or if excused
          if (!sub.submitted_at || sub.excused) {
            lateDaysMapForEveryone[sub.user_id][assignmentId] = 0;
            return;
          }

          const secondsLate = sub.seconds_late || 0;
          const minsLate = secondsLate / 60;
          const adjustedMinsLate = Math.max(minsLate - gracePeriodMin, 0);
          const hoursLate = adjustedMinsLate / 60;
          const daysLate = Math.ceil(hoursLate / 24);

          // Add late day count
          lateDaysMapForEveryone[sub.user_id][assignmentId] = daysLate;
        });
      });
    }

    // Determine the current view
    let currentView;
    let currentSelectedStudent;
    if (isStudent) {
      if (configurationSet) {
        currentView = VIEWS.STUDENT_HOME;
        currentSelectedStudent = students[0];
      } else {
        currentView = VIEWS.NOT_SET_UP;
      }
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
      currentView,
      currentSelectedStudent,
      lateDaysMapForEveryone,
      assignments,
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
      lateDaysMapForEveryone,
      assignments,
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

    if (
      currentView === VIEWS.STUDENT_HOME
      || currentView === VIEWS.TTM_VIEW_OF_SPECIFIC_STUDENT
    ) {
      const testDateOne = new Date('November 8 2019 05:35:32');
      const testDateTwo = new Date('November 7 2019 05:35:32');
      const testDateThree = new Date('November 7 2019 05:35:32');

      const {
        maxLateDaysPerSemester,
        maxLateDaysPerAssignment,
      } = configuration;

      const assignmentObjects = assignments.map((assignment) => {
        let value = 0;
        if (
          lateDaysMapForEveryone[currentSelectedStudent.id]
          && lateDaysMapForEveryone[currentSelectedStudent.id][assignment.id]
        ) {
          value = (
            lateDaysMapForEveryone[currentSelectedStudent.id][assignment.id]
          );
        }
        return {
          value,
          name: assignment.name,
          id: assignment.id,
          dueAt: new Date(assignment.due_at),
        };
      });

      body = (
        <StudentSummary
          profile={currentSelectedStudent}
          maxLateDaysPerAssignment={maxLateDaysPerAssignment}
          maxLateDaysPerSemester={maxLateDaysPerSemester}
          assignments={assignmentObjects}
          lateDaysMap={lateDaysMapForEveryone[currentSelectedStudent.id]}
          valueSuffix="Used"
          totalLateDaysUsed={4}
          nameHeader="Full Name"
          valueHeader="Late Days Used"
          dueAtHeader="Due At"
          courseId={courseId}
          canvasHost={canvasHost}
          showGetInTouch={(currentView === VIEWS.TTM_VIEW_OF_SPECIFIC_STUDENT)}
          showDueAt
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
