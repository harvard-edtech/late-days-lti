import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import FontAwesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

// Import styles
import './ItemFooter.css';

class ItemFooter extends Component {
  /**
   * Render ItemFooter
   */
  render() {
    const { footerMessage } = this.props;
    return (
      <div className="itemfooter-container">
        <FontAwesomeIcon
          icon={faCaretDown}
          className="mr-2 fa-rotate-180"
        />
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
