import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TotalLateDayProgress from './TotalLateDayProgress';
import AssignmentOveruseContainer from './AssignmentOveruseContainer';
import GetInTouchButton from './GetInTouchButton';

class StudentSummary extends Component {
  /**
   * Render StudentSummary
   */
  render() {

    return (
      <div>
        StudentSummary has not been created yet
      </div>
    );
  }
}

StudentSummary.propTypes = {
  // Student's profile
  profile: PropTypes.shape({
    // TODO: add props here
    id: PropTypes.number.isRequired,
    // https://canvas.instructure.com/doc/api/users.html#Profile
    // ^ see what you actually need in addition to id
  }).isRequired,
  // Max late days allowed per assignment
  maxLateDaysPerAssignment,
  maxLateDaysPerSemester,
  assignments,
  // Late day data
  // assignmentId => number of late days used
  lateDaysMap: PropTypes.objectOf(PropTypes.number).isRequired,
  // If true, show the get in touch button
  showGetInTouch: PropTypes.bool.isRequired,
};

// TODO: only show get in touch button if flag is true

export default StudentSummary;
