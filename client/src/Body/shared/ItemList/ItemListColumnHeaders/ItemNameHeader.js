import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ItemNameHeader extends Component {
  /**
   * Render ItemNameHeader
   */
  render() {
    const {
      text,
      onClick,
    } = this.props;
    return (
      <div className="itemnameheader-container">
        <button
          type="button"
          id="nameheader-button"
          className="btn btn-outline-secondary p-0"
          onClick={onClick}
        >
          {text}
        </button>
      </div>
    );
  }
}

ItemNameHeader.propTypes = {
  // The item name type to be displayed
  text: PropTypes.string.isRequired,
  // Sorts the items by name when clicked
  onClick: PropTypes.func.isRequired,
};

export default ItemNameHeader;
