import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ItemNameHeader extends Component {
  /**
   * Render ItemNameHeader
   */
  render() {
    return (
      <div>
        ItemNameHeader has not been created yet
      </div>
    );
  }
}

ItemNameHeader.propTypes = {
  // TODO: add description
  text: PropTypes.string.isRequired,
  // TODO: add description
  onClick: PropTypes.func.isRequired,
};

export default ItemNameHeader;
