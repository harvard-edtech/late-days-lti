import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ProgressBar from './ProgressBar.js';
import ProgressInfo from './ProgressInfo.js';

// import styles
import './style.css';

class TotalLateDayProgress extends Component {
  /**
   * Render TotalLateDayProgress
   */
  render() {
    const {
      value,
      valueDenominator,
      valueSuffix,
    } = this.props;
    return (
      <div className="totallatedayprogress-container m-3">
        <div className="totallatedayprogress-heading font-weight-bold">
          TOTAL LATE DAYS USED:
        </div>
        <div className="totallatedayprogress-fullbar d-flex">
          <div className="totallatedayprogress-bar flex-grow-1">
            <ProgressBar
              value={value}
              valueDenominator={valueDenominator}
            />
          </div>
          <div className="totallatedayprogress-info font-weight-bold">
            <ProgressInfo
              value={value}
              valueDenominator={valueDenominator}
              valueSuffix={valueSuffix}
            />
          </div>
        </div>
      </div>
    );
  }
}

TotalLateDayProgress.propTypes = {
  // number of tokens used
  value: PropTypes.number.isRequired,
  // number of tokens available
  valueDenominator: PropTypes.number.isRequired,
  // String to display after the value fraction
  valueSuffix: PropTypes.string.isRequired,
};


export default TotalLateDayProgress;
