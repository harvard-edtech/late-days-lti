import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ItemFooter extends Component {
  /**
   * Render ItemFooter
   */
  render() {
    return (
      <div>
        ItemFooter has not been created yet
      </div>
    );
  }
}

ItemFooter.propTypes = {
  // The message to display in the footer
  footerMessage: PropTypes.node.isRequired,
};


export default ItemFooter;
