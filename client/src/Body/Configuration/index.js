import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AssignmentGroups from './AssignmentGroups';
import Rules from './Rules';

// Import styles
import './Configuration.css';

class Configuration extends Component {
  /**
   * Render Configuration
   */
  render() {

    const {
      gracePeriodMin,
      maxLateDaysPerSemester,
      maxLateDaysPerAssignment,
      assignmentGroupIdsToCount,
    } = this.props;
    return (
      <div className="configuration-container">
        <Rules
          gracePeriodMin={gracePeriodMin}
          maxLateDaysPerAssignment={maxLateDaysPerAssignment}
          maxLateDaysPerSemester={maxLateDaysPerSemester}
        />
      </div>
    );
  }
}

Configuration.propTypes = {
  gracePeriodMin: PropTypes.number.isRequired,
  maxLateDaysPerSemester: PropTypes.number.isRequired,
  maxLateDaysPerAssignment: PropTypes.number.isRequired,
  assignmentGroupIdsToCount: PropTypes.arrayOf(PropTypes.string).isRequired,
};

Configuration.defaultProps = {};

export default Configuration;
