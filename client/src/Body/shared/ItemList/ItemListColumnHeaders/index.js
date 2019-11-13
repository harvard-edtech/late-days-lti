import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import other components
import ItemDueHeader from './ItemDueHeader';
import ItemNameHeader from './ItemNameHeader';
import ItemValueHeader from './ItemValueHeader';

// Import sort types
import SORT_TYPES from '../SORT_TYPES';

// Import styles
import './style.css';

class ItemListColumnHeaders extends Component {
  /**
   * Render ItemListColumnHeaders
   */
  render() {
    // If you click a header, call onSortTypeChange with the new sort type
    // AND if that is already the sort type, call onSortTypeChange with
    // ItemList.SORT_TYPES.NATURAL

    const {
      nameHeader,
      valueHeader,
      showDueAt,
      onSortTypeChange,
      sortType,
      dueAtHeader,
    } = this.props;

    const nameHead = (
      <div className="itemlistcolumnheaders-namecontainer itemlist-name-column flex-grow-1">
        <ItemNameHeader
          text={nameHeader}
          sortType={sortType}
          onClick={() => {
            onSortTypeChange(
              (sortType === SORT_TYPES.BY_NAME)
                ? SORT_TYPES.NATURAL
                : SORT_TYPES.BY_NAME
            );
          }}
        />
      </div>
    );

    const valueHead = (
      <div className="itemlistcolumnheaders-valuecontainer itemlist-value-column">
        <ItemValueHeader
          text={valueHeader}
          sortType={sortType}
          onClick={() => {
            onSortTypeChange(
              (sortType === SORT_TYPES.BY_VALUE)
                ? SORT_TYPES.NATURAL
                : SORT_TYPES.BY_VALUE
            );
          }}
        />
      </div>
    );

    const dueHead = (
      showDueAt
        ? (
          <div className="itemlistcolumnheaders-duecontainer itemlist-due-column">
            <ItemDueHeader
              text={dueAtHeader}
              sortType={sortType}
              onClick={() => {
                onSortTypeChange(
                  (sortType === SORT_TYPES.BY_DUE_AT)
                    ? SORT_TYPES.NATURAL
                    : SORT_TYPES.BY_DUE_AT
                );
              }}
            />
          </div>
        )
        : null
    );

    return (
      <div className="itemlistcolumnheaders-container d-flex mt-3">
        {nameHead}
        {dueHead}
        {valueHead}
      </div>
    );
  }
}

ItemListColumnHeaders.propTypes = {
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

ItemListColumnHeaders.defaultProps = {
  // By default, no header here
  dueAtHeader: 'ERROR',
};

export default ItemListColumnHeaders;
