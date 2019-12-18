import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Rule from './Rule';
class Rules extends Component {
  /**
   * Render Rules
   */
  render() {
    // Deconstruct props
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
              ruleDescription="The number of free minutes before a late day is used."
              ruleType="Mins"
              onRuleChange={onGracePeriodChanged}
            />
          </div>
          <div className="rules-maxSemester pb-4">
            <Rule
              userInput={maxLateDaysPerSemester}
              ruleHeader="Max Late Days Per Semester"
              ruleDescription="The total number of late days allowed per semester."
              ruleType="Days"
              onRuleChange={onMaxLateDaysPerSemesterChanged}
            />
          </div>
          <div className="rules-maxAssignment pb-1">
            <Rule
              userInput={maxLateDaysPerAssignment}
              ruleHeader="Max Late Days Per Assignment"
              ruleDescription="The maximum number of late days allowed to be used on each assignment."
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
  // number of grace periods given in minutes
  gracePeriodMin: PropTypes.string.isRequired,
  // Function called when grace period input changes
  onGracePeriodChanged: PropTypes.func.isRequired,
  // Maximum late days per semester
  maxLateDaysPerSemester: PropTypes.string.isRequired,
  // Function called when max late days per semester changes
  onMaxLateDaysPerSemesterChanged: PropTypes.func.isRequired,
  // Maximum late days per assignment
  maxLateDaysPerAssignment: PropTypes.string.isRequired,
  // Function called when maximum late days per assignment changes
  onMaxLateDaysPerAssignmentChanged: PropTypes.func.isRequired,
};

export default Rules;
