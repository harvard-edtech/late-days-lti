import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TotalLateDayProgress from './TotalLateDayProgress';
import AssignmentOveruseContainer from './AssignmentOveruseContainer';
import GetInTouchButton from './GetInTouchButton';

// import styles
import './style.css';

class StudentSummary extends Component {
  /**
   * Render StudentSummary
   */
  render() {
    const {
      profile,
      maxLateDaysPerSemester,
      totalLateDaysUsed,
      valueSuffix,
      showGetInTouch,
    } = this.props;
    const header = `${profile.name}'s Late Days Used`;
    const getInTouch = (
      showGetInTouch
        ? (
          <div className="studentsummary-getintouch">
            <GetInTouchButton />
          </div>
        )
        : null
    );
    return (
      <div className="studentsummary-container">
        <div className="studentsummary-heading font-weight-bold">
          {header}
        </div>
        {getInTouch}
        <TotalLateDayProgress
          totalLateDaysUsed={totalLateDaysUsed}
          maxLateDaysPerSemester={maxLateDaysPerSemester}
          valueSuffix={valueSuffix}
        />
      </div>
    );
  }
}

StudentSummary.propTypes = {
  // Student's profile
  profile: PropTypes.shape({
    // TODO: add props here
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
    // https://canvas.instructure.com/doc/api/users.html#Profile
    // ^ see what you actually need in addition to id
  }).isRequired,
  // Max late days allowed per assignment
  maxLateDaysPerAssignment: PropTypes.number.isRequired,
  maxLateDaysPerSemester: PropTypes.number.isRequired,
  assignments: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.string)
  ).isRequired,
  // Late day data
  // assignmentId => number of late days used
  lateDaysMap: PropTypes.objectOf(PropTypes.number).isRequired,
  // If true, show the get in touch button
  showGetInTouch: PropTypes.bool.isRequired,
  totalLateDaysUsed: PropTypes.number.isRequired,
  valueSuffix: PropTypes.string.isRequired,
};

// TODO: only show get in touch button if flag is true

export default StudentSummary;
