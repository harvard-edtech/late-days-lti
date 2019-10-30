import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import other components
import ItemDueHeader from './ItemDueHeader';
import ItemNameHeader from './ItemNameHeader';
import ItemValueHeader from './ItemValueHeader';

// Import sort types
import SORT_TYPES from '../SORT_TYPES';

class ItemRow extends Component {
  /**
   * Render ItemRow
   */
  render() {
    // If you click a header, call onSortTypeChange with the new sort type
    // AND if that is already the sort type, call onSortTypeChange with
    // ItemList.SORT_TYPES.NATURAL

    return (
      <div>
        ItemRow has not been created yet
      </div>
    );
  }
}

ItemRow.propTypes = {
  // If true, the header row is not shown
  hideColumnHeaders: PropTypes.bool.isRequired,
  // The header text above the item name column
  nameHeader: PropTypes.string.isRequired,
  // The header text above the item value column
  valueHeader: PropTypes.string.isRequired,
  // If true, the dueAt column is shown
  showDueAt: PropTypes.bool.isRequired,
  // Function to call when sort type is changed
  onSortTypeChange: PropTypes.func.isRequired,
  // Current sort type
  sortType: PropTypes.string.isRequired,
  // The header text above the item dueAt column
  dueAtHeader: PropTypes.string,
};

ItemRow.defaultProps = {
  // By default, no header here
  dueAtHeader: 'ERROR',
};

export default ItemRow;
