import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import FontAwesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

// Import sort types
import SORT_TYPES from '../SORT_TYPES';

class ItemDueHeader extends Component {
  /**
   * Render ItemDueHeader
   */
  render() {
    const {
      text,
      sortType,
      onClick,
    } = this.props;

    // Highlights this column header if clicked
    const highlighted = (sortType === SORT_TYPES.BY_DUE_AT);

    return (
      <div className="itemdueheader-container">
        <button
          type="button"
          id="dueheader-button"
          className={`btn p-0 btn-lg shadow-none font-weight-bold ${highlighted ? 'text-primary' : ''}`}
          onClick={onClick}
          aria-label={highlighted ? `Stop sorting by ${text}` : `Sort by ${text}`}
        >
          {text}
          <FontAwesomeIcon
            icon={faCaretDown}
            className="ml-1"
          />
        </button>
      </div>
    );
  }
}

ItemDueHeader.propTypes = {
  // text for Due At column header
  text: PropTypes.string.isRequired,
  // Current sort type
  sortType: PropTypes.string.isRequired,
  // function that sorts by dueAt date or natural
  onClick: PropTypes.func.isRequired,
};

export default ItemDueHeader;
