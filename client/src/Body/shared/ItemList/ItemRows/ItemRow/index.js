import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import other components
import ItemDue from './ItemDue';
import ItemName from './ItemName';
import ItemValue from './ItemValue';

class ItemRow extends Component {
  /**
   * Render ItemRow
   */
  render() {
    return (
      <div>
        ItemRow has not been created yet
      </div>
    );
  }
}

ItemRow.propTypes = {
  item: /* fill in once descriptions are made */.isRequired,
  // The denominator to show below the value
  valueDenominator: PropTypes.number.isRequired,
  // String to display after the value fraction
  valueSuffix: PropTypes.string.isRequired,
};

export default ItemRow;
