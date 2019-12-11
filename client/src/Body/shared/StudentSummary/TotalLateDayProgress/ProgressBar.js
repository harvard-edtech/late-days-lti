import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProgressBar extends Component {
  /**
   * Render ProgressBar
   */
  render() {
    const {
      totalLateDaysUsed,
      maxLateDaysPerSemester,
    } = this.props;

    // Calculate percentage of late day tokens used in total (0 to 100)
    const percentageUsed = (totalLateDaysUsed / maxLateDaysPerSemester) * 100;

    let color = 'bg-success';
    let label = '';

    // If student used all their tokens, show red progress bar
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
            className={`progress-bar ${color} font-weight-bold`}
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
  totalLateDaysUsed: PropTypes.number.isRequired,
  // number of tokens available
  maxLateDaysPerSemester: PropTypes.number.isRequired,
};


export default ProgressBar;
