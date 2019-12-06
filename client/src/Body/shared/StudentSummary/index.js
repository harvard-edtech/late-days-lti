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
  showGetInTouch: PropTypes.bool.isRequired,
};

// TODO: only show get in touch button if flag is true

export default StudentSummary;
