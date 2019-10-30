import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ItemValue extends Component {
  /**
   * Render ItemValue
   */
  render() {
    return (
      <div>
        ItemValue has not been created yet
      </div>
    );
  }
}

ItemValue.propTypes = {
  // TODO: add description
  value: PropTypes.number.isRequired,
  // The denominator to show below the value
  valueDenominator: PropTypes.number.isRequired,
  // String to display after the value fraction
  valueSuffix: PropTypes.string.isRequired,
};


export default ItemValue;
