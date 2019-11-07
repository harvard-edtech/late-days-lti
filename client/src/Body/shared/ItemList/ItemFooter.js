import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ItemFooter extends Component {
  /**
   * Render ItemFooter
   */
  render() {
    const { footerMessage } = this.props;
    return (
      <div className="itemfooter-container">
        {footerMessage}
      </div>
    );
  }
}

ItemFooter.propTypes = {
  // The message to display in the footer
  footerMessage: PropTypes.node.isRequired,
};


export default ItemFooter;
