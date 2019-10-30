import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ItemDueHeader extends Component {
  /**
   * Render ItemDueHeader
   */
  render() {
    return (
      <div>
        ItemDueHeader has not been created yet
      </div>
    );
  }
}

ItemDueHeader.propTypes = {
  // TODO: add description
  text: PropTypes.string.isRequired,
  // TODO: add description
  onClick: PropTypes.func.isRequired,
};

export default ItemDueHeader;
