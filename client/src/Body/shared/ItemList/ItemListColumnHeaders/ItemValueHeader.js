import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ItemValueHeader extends Component {
  /**
   * Render ItemValueHeader
   */
  render() {
    const {
      text,
      onClick,
    } = this.props;
    return (
      <div className="itemvalueheader-container">
        <button
          type="button"
          id="valueheader-button"
          className="btn btn-outline-secondary p-0"
          onClick={onClick}
        >
          {text}
        </button>
      </div>
    );
  }
}

ItemValueHeader.propTypes = {
  // item value type for column header
  text: PropTypes.string.isRequired,
  // sorts items by value or natural order
  onClick: PropTypes.func.isRequired,
};

export default ItemValueHeader;
