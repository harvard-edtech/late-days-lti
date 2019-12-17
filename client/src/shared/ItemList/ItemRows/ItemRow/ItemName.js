import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Style
import './ItemName.css';

class ItemName extends Component {
  /**
   * Render ItemName
   */
  render() {
    const { name, onClick } = this.props;

    // Make item clickable if given a onClick function
    if (onClick) {
      return (
        <button
          type="button"
          className="ItemName-button btn btn-stripped btn-lg"
          id="itemname-button"
          aria-label={`click to open ${name}`}
          onClick={onClick}
        >
          {name}
        </button>
      );
    }

    return (
      <div className="itemname-container">
        {name}
      </div>
    );
  }
}

ItemName.propTypes = {
  // Name of assignment or person
  name: PropTypes.string.isRequired,
  // Handler to call when clicked
  onClick: PropTypes.func,
};

ItemName.defaultProps = {
  // No onClick by default
  onClick: null,
};

export default ItemName;
