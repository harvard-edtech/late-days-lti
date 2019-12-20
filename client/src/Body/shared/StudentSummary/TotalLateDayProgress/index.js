import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ProgressBar from './ProgressBar';
import ProgressInfo from './ProgressInfo';

// import styles
import './style.css';

class TotalLateDayProgress extends Component {
  /**
   * Render TotalLateDayProgress
   */
  render() {
    const {
      totalLateDaysUsed,
      maxLateDaysPerSemester,
      valueSuffix,
    } = this.props;

    return (
      <div className="totallatedayprogress-container">
        <div className="totallatedayprogress-heading font-weight-bold">
          TOTAL LATE DAYS USED:
        </div>
        <div className="totallatedayprogress-fullbar d-flex">
          <div className="totallatedayprogress-bar flex-grow-1">
            <ProgressBar
              totalLateDaysUsed={totalLateDaysUsed}
              maxLateDaysPerSemester={maxLateDaysPerSemester}
            />
          </div>
          <div className="totallatedayprogress-info itemlist-value-column font-weight-bold">
            <ProgressInfo
              totalLateDaysUsed={totalLateDaysUsed}
              maxLateDaysPerSemester={maxLateDaysPerSemester}
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
  totalLateDaysUsed: PropTypes.number.isRequired,
  // number of tokens available
  maxLateDaysPerSemester: PropTypes.number.isRequired,
  // String to display after the value fraction
  valueSuffix: PropTypes.string.isRequired,
};


export default TotalLateDayProgress;
