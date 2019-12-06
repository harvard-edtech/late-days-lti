// Use input group:
// https://getbootstrap.com/docs/4.3/components/input-group/

// Looks like:
// Title [input field | suffix]
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Rule.css';

class Rule extends Component {
  /**
   * Render Rule
   */
  render() {
    const {
      userInput,
      ruleHeader,
      ruleDescription,
      ruleType,
      onRuleChange,
    } = this.props;

    return (
      <div className="rule-container">
        <div className="rule-header">
          {`${ruleHeader}:`}
        </div>
        <div className="rule-description">
          {ruleDescription}
        </div>
        <div className="input-group">
          <input
            id="rule-input"
            type="text"
            value={userInput}
            className="form-control"
            onChange={(e) => {
              onRuleChange(e.target.value);
            }}
          />
          <div className="input-group-append">
            <span className="input-group-text" id="basic-addon2">{ruleType}</span>
          </div>
        </div>
      </div>
    );
  }
}


Rule.propTypes = {
  // What the user enters into the form
  userInput: PropTypes.string.isRequired,
  // Header of the rule (What the rule is)
  ruleHeader: PropTypes.string.isRequired,
  // Description of what the rule is
  ruleDescription: PropTypes.string.isRequired,
  // What the input is measured in (mins, days)
  ruleType: PropTypes.string.isRequired,
  onRuleChange: PropTypes.func.isRequired,
};


export default Rule;
