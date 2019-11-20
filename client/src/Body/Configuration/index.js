import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AssignmentGroups from './AssignmentGroups';
import Rules from './Rules';

class Configuration extends Component {
  /**
   * Render Configuration
   */
  render() {
    return (
      <div>
        Configuration has not been created yet
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
