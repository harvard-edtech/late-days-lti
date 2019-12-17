import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Style
import './ProgressInfo.css';

class ProgressInfo extends Component {
  /**
   * Render ProgressInfo
   */
  render() {
    const {
      totalLateDaysUsed,
      maxLateDaysPerSemester,
      valueSuffix,
    } = this.props;

    let concatVal = `${totalLateDaysUsed}/${maxLateDaysPerSemester}`;

    if (valueSuffix !== '') {
      concatVal += ` ${valueSuffix}`;
    }

    return (
      <div className="progressinfo-container pt-3 text-center font-weight-bold">
        {concatVal}
      </div>
    );
  }
}


ProgressInfo.propTypes = {
  // number of tokens used
  totalLateDaysUsed: PropTypes.number.isRequired,
  // number of tokens available
  maxLateDaysPerSemester: PropTypes.number.isRequired,
  // String to display after the value fraction
  valueSuffix: PropTypes.string.isRequired,
};


export default ProgressInfo;
