import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import clone function
import clone from 'shallow-clone';

// Import other components
import ItemRow from './ItemRow';

// Import sort types
import SORT_TYPES from '../SORT_TYPES';

// Sort comparators
const byDueAt = (a, b) => {
  // Sorts by most recent due date at top
  if (a.dueAt && b.dueAt) {
    const aValue = a.dueAt.getTime();
    const bValue = b.dueAt.getTime();
    if (aValue > bValue) {
      return -1;
    }
    if (aValue < bValue) {
      return 1;
    }
  }

  return 0;
};

const byName = (a, b) => {
  const aValue = a.name;
  const bValue = b.name;
  if (aValue < bValue) {
    return -1;
  }
  if (aValue > bValue) {
    return 1;
  }
  return 0;
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
      items,
      sortType,
      valueDenominator,
      valueSuffix,
    } = this.props;

    // Sort the items
    // > Clone the item list
    const itemsClone = clone(items);
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
      itemsClone.sort(comparator);
    }

    const rowElements = itemsClone.map((item) => {
      return (
        <div key={item.name}>
          <div
            className="itemrows-elem"
          >
            <ItemRow
              item={item}
              valueDenominator={valueDenominator}
              valueSuffix={valueSuffix}
            />
          </div>
        </div>
      );
    });

    return (
      <div className="itemrows-container">
        {rowElements}
      </div>
    );
  }
}

ItemRows.propTypes = {
  // The array of items to display
  items: PropTypes.arrayOf(
    PropTypes.shape({
      // the name of an item
      name: PropTypes.string.isRequired,
      // item's value (number of tokens used)
      value: PropTypes.number.isRequired,
      // optional function that allows a item to be clicked for more detail
      onClick: PropTypes.func,
      // optional due date of item
      dueAt: PropTypes.instanceOf(Date),
    })
  ).isRequired,
  // The denominator to show below the value
  valueDenominator: PropTypes.number.isRequired,
  // String to display after the value fraction
  valueSuffix: PropTypes.string.isRequired,
  // Type of sort
  sortType: PropTypes.string.isRequired,
};


export default ItemRows;
