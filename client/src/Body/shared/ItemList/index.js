import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import other components
import ItemListColumnHeaders from './ItemListColumnHeaders';
import ItemRows from './ItemRows';
import ItemFooter from './ItemFooter';
import ItemSearchBar from './ItemSearchBar';

// Import sort types
import SORT_TYPES from './SORT_TYPES';

// Import styles
import './style.css';

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
    this.setState({
      sortType: newSortType,
    });
  }

  /**
   * Update the search query
   * @param {string} newQuery - the new query string
   */
  onQueryChange(newQuery) {
    this.setState({
      searchQuery: newQuery,
    });
  }

  /**
   * Render ItemList
   */
  render() {
    const {
      items,
      valueDenominator,
      hideColumnHeaders,
      nameHeader,
      dueAtHeader,
      valueHeader,
      valueSuffix,
      showDueAt,
      hideSearchBar,
      footerMessage,
    } = this.props;

    const {
      searchQuery,
      sortType,
    } = this.state;

    /* ----------------- Filter Items Based on Search Query ----------------- */
    let filteredItems;
    let isFiltered = false;

    if (searchQuery.trim() !== '') {
      isFiltered = true;
      const regQuery = new RegExp(searchQuery.trim(), 'i');
      filteredItems = items.filter((item) => {
        const {
          name,
          value,
          dueAt,
        } = item;

        return (
          regQuery.test(name)
          || regQuery.test(value)
          || regQuery.test(dueAt)
        );
      });
    }

    /* ------------------- Create Search Bar Elem ------------------- */
    const searchBarElem = (
      hideSearchBar
        ? null
        : (
          <ItemSearchBar
            query={searchQuery}
            onQueryChange={this.onQueryChange}
          />
        )
    );

    /* ----------------------- Create Headers ----------------------- */
    const headerElem = (
      hideColumnHeaders
        ? null
        : (
          <ItemListColumnHeaders
            nameHeader={nameHeader}
            valueHeader={valueHeader}
            showDueAt={showDueAt}
            onSortTypeChange={this.onSortTypeChange}
            sortType={sortType}
            dueAtHeader={dueAtHeader}
          />
        )
    );

    /* --------------------- Create Footer Elem --------------------- */
    const footerElem = (
      footerMessage
        ? (
          <ItemFooter
            footerMessage={footerMessage}
          />
        )
        : null
    );

    /* --------------------- Create Item Rows Elem --------------------- */
    const itemsDisplayed = (isFiltered ? filteredItems : items);

    const itemRowsElem = (
      (items.length > 0)
        ? (
          <ItemRows
            items={itemsDisplayed}
            valueDenominator={valueDenominator}
            valueSuffix={valueSuffix}
            sortType={sortType}
            showDueAt={showDueAt}
          />
        )
        : 'No items have been given.'
    );
    /* ----------------------- Render ItemList ---------------------- */
    return (
      <div className="itemlist-container m-3">
        {searchBarElem}
        {headerElem}
        {itemRowsElem}
        {footerElem}
      </div>
    );
  }
}

ItemList.propTypes = {
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
  // If true, search bar is shown
  hideSearchBar: PropTypes.bool,
  // The message to display in the footer
  footerMessage: PropTypes.node,
};

ItemList.defaultProps = {
  // By default, column headers is shown
  hideColumnHeaders: false,
  // Initial name in header
  nameHeader: 'No Header Name!',
  // Initial due at title in header
  dueAtHeader: 'Due At',
  // Initial value title in header
  valueHeader: 'No Header Name!',
  // Initial suffix is empty
  valueSuffix: '',
  // By default, due at column is shown
  showDueAt: false,
  // By default, search bar is shown
  hideSearchBar: false,
  // By default, no footer is shown
  footerMessage: null,
};

export default ItemList;
