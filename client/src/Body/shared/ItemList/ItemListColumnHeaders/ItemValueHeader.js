import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ItemValueHeader extends Component {
  /**
   * Render ItemValueHeader
   */
  render() {
    return (
      <div>
        ItemValueHeader has not been created yet
      </div>
    );
  }
}

ItemValueHeader.propTypes = {
  // TODO: add description
  text: PropTypes.string.isRequired,
  // TODO: add description
  onClick: PropTypes.func.isRequired,
};

export default ItemValueHeader;
