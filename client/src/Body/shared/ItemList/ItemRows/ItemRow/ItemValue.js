import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ItemValue extends Component {
  /**
   * Render ItemValue
   */
  render() {
    const {
      value,
      valueDenominator,
      valueSuffix,
    } = this.props;

    let concatVal = `${value}/${valueDenominator}`;
    if (valueSuffix) {
      concatVal += ` ${valueSuffix}`;
    }

    return (
      <div className="itemvalue-container">
        {concatVal}
      </div>
    );
  }
}

ItemValue.propTypes = {
  // number of tokens used
  value: PropTypes.number.isRequired,
  // number of tokens available
  valueDenominator: PropTypes.number.isRequired,
  // String to display after the value fraction
  valueSuffix: PropTypes.string.isRequired,
};


export default ItemValue;
