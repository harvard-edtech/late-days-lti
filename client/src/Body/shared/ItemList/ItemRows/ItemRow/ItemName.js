import React, { Component } from 'react';
import PropTypes from 'prop-types';
class ItemName extends Component {
  /**
   * Render ItemName
   */
  render() {

    return (
      <div>
        ItemName has not been created yet
      </div>
    );
  }
}

ItemName.propTypes = {
  // TODO: add description
  name: PropTypes.string.isRequired,
};


export default ItemName;
