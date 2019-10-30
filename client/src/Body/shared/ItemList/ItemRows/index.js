import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import clone function
import clone from 'fast-clone';

// Import other components
import ItemRow from './ItemRow';

// Import sort types
import SORT_TYPES from '../SORT_TYPES';

// Sort comparators
const byDueAt = (a, b) => {
  // TODO: implement
  // Note: use date.getTime() IF there is a date. If there's no date in either object, a and b are equal (return 0)
};
const byName = (a, b) => {
  // TODO: implement
};
const byValue = (a, b) => {
  const aValue = a.value;
  const bValue = b.value;
  if (aValue < bValue) {
    return -1;
  }
  if (aValue > bValue) {
    return 1;
  }
  return 0;
};


class ItemRows extends Component {
  /**
   * Render ItemRows
   */
  render() {
    const {
      sortType,
      valueDenominator,
      valueSuffix,
    } = this.props;

    // Sort the items
    // > Clone the item list
    const items = clone(this.props.items);
    // > Choose the right comparator
    let comparator;
    if (sortType === SORT_TYPES.BY_NAME) {
      comparator = byName;
    } if (sortType === SORT_TYPES.BY_VALUE) {
      comparator = byValue;
    } if (sortType === SORT_TYPES.BY_DUE_AT) {
      comparator = byDueAt;
    }
    // > Sort if there is a comparator
    if (comparator) {
      items.sort(comparator);
    }

    return (
      <div>
        ItemRows has not been created yet
      </div>
    );
  }
}

ItemRows.propTypes = {
  // TODO: add description
  items: /* fill in once descriptions are made */.isRequired,
  // The denominator to show below the value
  valueDenominator: PropTypes.number.isRequired,
  // String to display after the value fraction
  valueSuffix: PropTypes.string.isRequired,
  // Type of sort
  sortType: PropTypes.string.isRequired,
};


export default ItemRows;
