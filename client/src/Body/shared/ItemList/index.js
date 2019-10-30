const SORT_TYPES = {
  BY_TITLE: 'by-title',
  BY_DUE_AT: 'by-due-at',
  BY_VALUE: 'by-value',
};
import ItemListColumnHeaders from './ItemListColumnHeaders';
import ItemRows from './ItemRows';
import ItemFooter from './ItemFooter';
import ItemSearchBar from './ItemSearchBar';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
class ItemList extends Component {
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


ItemList.propTypes = {
  hideSearchBar: PropTypes.bool.isRequired,
  hideColumnHeader: PropTypes.bool.isRequired,
  showDueAt: PropTypes.bool.isRequired,
  valueSuffix: PropTypes.bool.isRequired,
};


export default ItemList;