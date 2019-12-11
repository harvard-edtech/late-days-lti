import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import FontAwesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

// Import sort types
import SORT_TYPES from '../SORT_TYPES';

class ItemNameHeader extends Component {
  /**
   * Render ItemNameHeader
   */
  render() {
    const {
      text,
      sortType,
      onClick,
    } = this.props;

    // Highlights this column header if clicked
    const highlighted = (sortType === SORT_TYPES.BY_NAME);

    return (
      <div className="itemnameheader-container">
        <button
          type="button"
          id="nameheader-button"
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

ItemNameHeader.propTypes = {
  // The item name type to be displayed
  text: PropTypes.string.isRequired,
  // Current sort type
  sortType: PropTypes.string.isRequired,
  // Sorts the items by name when clicked
  onClick: PropTypes.func.isRequired,
};

export default ItemNameHeader;
