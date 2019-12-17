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

// import styles
import './style.css';

class InstructorDashboard extends Component {
  /**
   * Render InstructorDashboard
   */
  render() {
    const {
      lateDaysMapForEveryone,
      onClickAssignmentButton,
      onClickConfigButton,
      onClickStudentUsage,
    } = this.props;
    return (
      <div className="instructordashboard-container">
        <div className="instructordashboard-navbuttons d-flex">
          <ConfigButton
            onClick={onClickConfigButton}
          />
          <ByStudentButton
            onClick={onClickStudentUsage}
          />
          <ByAssignmentButton
            onClick={onClickAssignmentButton}
          />
        </div>
      </div>
    );
  }
}

InstructorDashboard.propTypes = {
  onClickAssignmentButton: PropTypes.func.isRequired,
  onClickConfigButton: PropTypes.func.isRequired,
  onClickStudentUsage: PropTypes.func.isRequired,
  // Late days used for all students
  // studentId => assignmentId => number of late days used
  lateDaysMapForEveryone: PropTypes.objectOf(
    PropTypes.objectOf(
      PropTypes.number
    )
  ).isRequired,
};


export default InstructorDashboard;
