import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Rule from './Rule';
class Rules extends Component {
  /**
   * Render Rules
   */
  render() {
    const {
      gracePeriodMin,
      onGracePeriodChanged,
      maxLateDaysPerSemester,
      onMaxLateDaysPerSemesterChanged,
      maxLateDaysPerAssignment,
      onMaxLateDaysPerAssignmentChanged,
    } = this.props;
    return (
      <div className="rules-container alert alert-info pl-3 pr-3 pb-3 pt-1 mt-2">
        <h3 className="mb-1">
          Rules
        </h3>
        <div className="alert alert-light text-dark mb-0">
          <div className="rules-graceperiod pb-4">
            <Rule
              userInput={gracePeriodMin}
              ruleHeader="Grace Period"
              ruleDescription="We need a description here"
              ruleType="Mins"
              onRuleChange={onGracePeriodChanged}
            />
          </div>
          <div className="rules-maxSemester pb-4">
            <Rule
              userInput={maxLateDaysPerSemester}
              ruleHeader="Max Late Days Per Semester"
              ruleDescription="We need a description here"
              ruleType="Days"
              onRuleChange={onMaxLateDaysPerSemesterChanged}
            />
          </div>
          <div className="rules-maxAssignment pb-1">
            <Rule
              userInput={maxLateDaysPerAssignment}
              ruleHeader="Max Late Days Per Assignment"
              ruleDescription="We need a description here"
              ruleType="Days"
              onRuleChange={onMaxLateDaysPerAssignmentChanged}
            />
          </div>
        </div>
      </div>
    );
  }
}


Rules.propTypes = {
  gracePeriodMin: PropTypes.number.isRequired,
  onGracePeriodChanged: PropTypes.func.isRequired,
  maxLateDaysPerSemester: PropTypes.number.isRequired,
  onMaxLateDaysPerSemesterChanged: PropTypes.func.isRequired,
  maxLateDaysPerAssignment: PropTypes.number.isRequired,
  onMaxLateDaysPerAssignmentChanged: PropTypes.func.isRequired,
};

export default Rules;
