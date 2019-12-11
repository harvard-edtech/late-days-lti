import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import styles
import './ProgressBar.css';

class ProgressBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // True if the progress bar should show 0 instead (used for animating)
      zeroed: true,
    };
  }

  /**
   * Start the animation
   */
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        zeroed: false,
      });
    }, 50);
  }

  /**
   * Render ProgressBar
   */
  render() {
    const {
      totalLateDaysUsed,
      maxLateDaysPerSemester,
    } = this.props;
    const { zeroed } = this.state;

    // Calculate percentage of late day tokens used in total (0 to 100)
    let percentageUsed = 0;
    if (!zeroed) {
      percentageUsed = (totalLateDaysUsed / maxLateDaysPerSemester) * 100;
    }

    let color = 'bg-info';
    let label = '';

    // If student used all their tokens, show red progress bar
    if (percentageUsed > 100) {
      color = 'bg-crimson';
      percentageUsed = 100;
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
            className={`progress-bar progressbar-bar ${color} font-weight-bold`}
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
