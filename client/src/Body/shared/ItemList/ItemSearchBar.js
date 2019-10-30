import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ItemSearchBar extends Component {
  /**
   * Render ItemSearchBar
   */
  render() {
    return (
      <div>
        ItemSearchBar has not been created yet
      </div>
    );
  }
}

ItemSearchBar.propTypes = {
  // Search bar current query
  query: PropTypes.string.isRequired,
  // Function to call when the search text changes
  onQueryChange: PropTypes.func.isRequired,
};


export default ItemSearchBar;
