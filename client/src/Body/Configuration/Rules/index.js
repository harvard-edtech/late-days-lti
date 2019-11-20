import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Rule from './Rule';
class Rules extends Component {
  /**
   * Render CancelButton
   */
  render() {
    const {
      gracePeriodMin,
      maxLateDaysPerSemester,
      maxLateDaysPerAssignment,
    } = this.props;
    return (
      <div className="rules-container">
        <div className="rules-graceperiod">
          <Rule
            userInput={gracePeriodMin}
            ruleHeader="Grace Period"
            ruleDescription="We need a description here"
            ruleType="Mins"
          />
        </div>
        <div className="rules-maxSemester">
          <Rule
            userInput={maxLateDaysPerSemester}
            ruleHeader="Max Late Days Per Semester"
            ruleDescription="We need a description here"
            ruleType="Days"
          />
        </div>
        <div className="rules-maxAssignment">
          <Rule
            userInput={maxLateDaysPerAssignment}
            ruleHeader="Max Late Days Per Assignment"
            ruleDescription="We need a description here"
            ruleType="Days"
          />
        </div>
      </div>
    );
  }
}


Rules.propTypes = {
  gracePeriodMin: PropTypes.number.isRequired,
  maxLateDaysPerSemester: PropTypes.number.isRequired,
  maxLateDaysPerAssignment: PropTypes.number.isRequired,
};

export default Rules;
