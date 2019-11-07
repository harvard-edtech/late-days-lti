import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ItemDueHeader extends Component {
  /**
   * Render ItemDueHeader
   */
  render() {
    const {
      text,
      onClick,
    } = this.props;
    return (
      <div className="itemdueheader-container">
        <button
          type="button"
          className="btn btn-outline-secondary p-0"
          onClick={onClick}
        >
          {text}
        </button>
      </div>
    );
  }
}

ItemDueHeader.propTypes = {
  // text for Due At column header
  text: PropTypes.string.isRequired,
  // function that sorts by dueAt date or natural
  onClick: PropTypes.func.isRequired,
};

export default ItemDueHeader;
