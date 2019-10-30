import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import other components
import ItemListColumnHeaders from './ItemListColumnHeaders';
import ItemRows from './ItemRows';
import ItemFooter from './ItemFooter';
import ItemSearchBar from './ItemSearchBar';

// Import sort types
import SORT_TYPES from './SORT_TYPES';

class ItemList extends Component {
  constructor(props) {
    super(props);

    // Initialize the state
    this.state = {
      // Current search query
      searchQuery: '',
      // Current sort type
      sortType: SORT_TYPES.NATURAL,
    };

    // Bind handlers
    this.onSortTypeChange = this.onSortTypeChange.bind(this);
    this.onQueryChange = this.onQueryChange.bind(this);
  }

  /**
   * Function to call when sort type is changed
   * @param {string} newSortType - the new sort type
   */
  onSortTypeChange(newSortType) {
    // TODO: implement
  }

  /**
   * Update the search query
   * @param {string} newQuery - the new query string
   */
  onQueryChange(newQuery) {
    // TODO: implement
  }

  /**
   * Render ItemList
   */
  render() {
    return (
      <div>
        ItemList has not been created yet
      </div>
    );
  }
}

ItemList.propTypes = {
  // TODO: add description
  items: PropTypes.arrayOf(
    PropTypes.shape({
      // TODO: add description
      name: PropTypes.string.isRequired,
      // TODO: add description
      value: PropTypes.number.isRequired,
      // TODO: add description
      onClick: PropTypes.func,
      // TODO: add description
      dueAt: PropTypes.instanceOf(Date),
    })
  ).isRequired, // TODO: copy/paste this elsewhere once descriptions are added
  // The denominator to show below the value
  valueDenominator: PropTypes.number.isRequired,
  // If true, the header row is not shown
  hideColumnHeaders: PropTypes.bool,
  // The header text above the item name column
  nameHeader: PropTypes.string,
  // The header text above the item dueAt column
  dueAtHeader: PropTypes.string,
  // The header text above the item value column
  valueHeader: PropTypes.string,
  // String to display after the value fraction
  valueSuffix: PropTypes.string,
  // If true, the dueAt column is shown
  showDueAt: PropTypes.bool,
  // TODO: add description
  hideSearchBar: PropTypes.bool,
  // The message to display in the footer
  footerMessage: PropTypes.node,
};

ItemList.defaultProps = {
  // TODO: add description
  hideColumnHeaders: false,
  // TODO: add description
  nameHeader: 'No Header Name!',
  // TODO: add description
  dueAtHeader: 'Due At',
  // TODO: add description
  valueHeader: 'No Header Name!',
  // TODO: add description
  valueSuffix: '',
  // TODO: add description
  showDueAt: false,
  // TODO: add description
  hideSearchBar: false,
  // By default, no footer is shown
  footerMessage: null,
};

export default ItemList;
