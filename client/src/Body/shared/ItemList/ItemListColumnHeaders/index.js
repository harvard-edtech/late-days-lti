import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import other components
import ItemDueHeader from './ItemDueHeader';
import ItemNameHeader from './ItemNameHeader';
import ItemValueHeader from './ItemValueHeader';

// Import sort types
import SORT_TYPES from '../SORT_TYPES';

class ItemListColumnHeaders extends Component {
  /**
   * Render ItemListColumnHeaders
   */
  render() {
    // If you click a header, call onSortTypeChange with the new sort type
    // AND if that is already the sort type, call onSortTypeChange with
    // ItemList.SORT_TYPES.NATURAL

    const {
      hideColumnHeaders,
      nameHeader,
      valueHeader,
      showDueAt,
      onSortTypeChange,
      sortType,
      dueAtHeader,
    } = this.props;

    let dueHead;
    let nameHead;
    let valueHead;

    if (!hideColumnHeaders) {
      nameHead = (
        <div className="itemlistcolumnheaders-namecontainer">
          <ItemNameHeader
            text={nameHeader}
            onClick={
              onSortTypeChange(
                (sortType === SORT_TYPES.BY_NAME)
                  ? SORT_TYPES.NATURAL : SORT_TYPES.BY_NAME
              )
            }
          />
        </div>
      );
      valueHead = (
        <div className="itemlistcolumnheaders-valuecontainer">
          <ItemValueHeader
            text={valueHeader}
            onClick={
              onSortTypeChange(
                (sortType === SORT_TYPES.BY_VALUE)
                  ? SORT_TYPES.NATURAL : SORT_TYPES.BY_VALUE
              )
            }
          />
        </div>
      );

      if (showDueAt) {
        dueHead = (
          <div className="itemlistcolumnheaders-duecontainer">
            <ItemDueHeader
              text={dueAtHeader}
              onClick={
                onSortTypeChange(
                  (sortType === SORT_TYPES.BY_DUE_AT)
                    ? SORT_TYPES.NATURAL : SORT_TYPES.BY_DUE_AT
                )
              }
            />
          </div>
        );
      }
    }
    return (
      <div className="itemlistcolumnheaders-container">
        {nameHead}
        {dueHead}
        {valueHead}
      </div>
    );
  }
}

ItemListColumnHeaders.propTypes = {
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

ItemListColumnHeaders.defaultProps = {
  // By default, no header here
  dueAtHeader: 'ERROR',
};

export default ItemListColumnHeaders;
