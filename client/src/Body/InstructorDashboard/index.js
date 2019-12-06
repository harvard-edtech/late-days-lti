import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Chooser buttons
import ByAssignmentButton from './ByAssignmentButton';
import ByStudentButton from './ByStudentButton';
import ConfigButton from './ConfigButton';

// Views
import LateDaysByStudentView from './LateDaysByStudentView';
import StudentUsageOnAssignmentView from './StudentUsageOnAssignmentView';
import StudentSummary from '../shared/StudentSummary';

class InstructorDashboard extends Component {
  /**
   * Render InstructorDashboard
   */
  render() {

    return (
      <div>
        InstructorDashboard has not been created yet
      </div>
    );
  }
}

InstructorDashboard.propTypes = {
  // Late days used for all students
  // studentId => assignmentId => number of late days used
  lateDaysMapForEveryone: PropTypes.objectOf(
    PropTypes.objectOf(
      PropTypes.number
    )
  ).isRequired,
};


export default InstructorDashboard;
