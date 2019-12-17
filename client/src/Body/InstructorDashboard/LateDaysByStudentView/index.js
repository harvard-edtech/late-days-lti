import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StudentSummary from '../../shared/StudentSummary';

class LateDaysByStudentView extends Component {
  /**
   * Render LateDaysByStudentView
   */
  render() {
    const {
      ttmProfile,
      maxLateDaysPerAssignment,
      maxLateDaysPerSemester,
      assignments,
      lateDaysMap,
      showGetInTouch,
      totalLateDaysUsed,
      valueSuffix,
      nameHeader,
      valueHeader,
      dueAtHeader,
      showDueAt,
      courseId,
      canvasHost,
    } = this.props;
    return (
      <div className="latedaysbystudentview-container">
        <div className="latedaysbystudentview-header">
          Late Days By Student
        </div>
        <StudentSummary
          profile={ttmProfile}
          maxLateDaysPerAssignment={maxLateDaysPerAssignment}
          maxLateDaysPerSemester={maxLateDaysPerSemester}
          assignments={assignments}
          lateDaysMap={lateDaysMap}
          showGetInTouch={showGetInTouch}
          totalLateDaysUsed={totalLateDaysUsed}
          valueSuffix={valueSuffix}
          nameHeader={nameHeader}
          valueHeader={valueHeader}
          dueAtHeader={dueAtHeader}
          showDueAt={showDueAt}
          courseId={courseId}
          canvasHost={canvasHost}
        />
      </div>
    );
  }
}

LateDaysByStudentView.propTypes = {
  // TTM's profile
  ttmProfile: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  // Max late days allowed per assignment
  maxLateDaysPerAssignment: PropTypes.number.isRequired,
  // Max late days allowed per semester
  maxLateDaysPerSemester: PropTypes.number.isRequired,
  // Array of assignments
  assignments: PropTypes.arrayOf(
    PropTypes.shape({
      // the name of assignment
      name: PropTypes.string.isRequired,
      // the ID of the assignment
      id: PropTypes.number.isRequired,
      // the due date of the assignment,
      dueAt: PropTypes.instanceOf(Date),
      // The number of late days used
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
  // Late day data
  // assignmentId => number of late days used
  lateDaysMap: PropTypes.objectOf(PropTypes.number).isRequired,
  // If true, show the get in touch button
  showGetInTouch: PropTypes.bool.isRequired,
  // Total number of late days used by student
  totalLateDaysUsed: PropTypes.number.isRequired,
  // String to display after the value fraction
  valueSuffix: PropTypes.string.isRequired,
  // Header for name column
  nameHeader: PropTypes.string.isRequired,
  // Header for value column
  valueHeader: PropTypes.string.isRequired,
  // Header for dueAt column
  dueAtHeader: PropTypes.string.isRequired,
  // Determines whether to show DueAt column
  showDueAt: PropTypes.bool.isRequired,
  // The course id
  courseId: PropTypes.number.isRequired,
  // The hostname of Canvas
  canvasHost: PropTypes.string.isRequired,
};

export default LateDaysByStudentView;
