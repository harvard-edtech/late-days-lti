import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProgressBar extends Component {
  /**
   * Render ProgressBar
   */
  render() {
    const {
      value,
      valueDenominator,
    } = this.props;

    const percentageUsed = (value / valueDenominator) * 100;
    let color = 'bg-success';
    let label = '';

    if (percentageUsed > 100) {
      color = 'bg-danger';
      label = 'USED TOO MANY!';
    }
    return (
      <div className="progressbar-container">
        <div
          className="progress"
          style={{
            height: '30px',
          }}
        >
          <div
            className={`progress-bar ${color}`}
            role="progressbar"
            style={{
              width: `${percentageUsed}%`,
            }}
            aria-label="Progress bar for late days used"
            aria-valuenow={percentageUsed}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            {label}
          </div>
        </div>
      </div>
    );
  }
}

ProgressBar.propTypes = {
  // number of tokens used
  value: PropTypes.number.isRequired,
  // number of tokens available
  valueDenominator: PropTypes.number.isRequired,
};


export default ProgressBar;
