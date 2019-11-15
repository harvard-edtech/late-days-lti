import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import styles
import './ItemSearchBar.css';

class ItemSearchBar extends Component {
  /**
   * Render ItemSearchBar
   */
  render() {
    const {
      query,
      onQueryChange,
    } = this.props;

    return (
      <div className="itemsearchbar-container">
        <div className="input-group">
          <input
            id="itemsearchbar-input"
            type="text"
            value={query}
            placeholder="Search"
            onChange={(e) => {
              onQueryChange(e.target.value);
            }}
            className="form-control"
          />
        </div>
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
