import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import FontAwesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

class ConfigButton extends Component {
  /**
   * Render ConfigButton
   */
  render() {
    const {
      onClick,
    } = this.props;

    return (
      <div className="bystudentbutton-container">
        <button
          type="button"
          className="btn btn-primary btn-lg dashboard-btn mt-3 mb-3 font-weight-bold"
          onClick={onClick}
        >
          <FontAwesomeIcon
            icon={faCog}
            className="mr-1"
          />
          Edit Configuration
        </button>
      </div>
    );
  }
}

ConfigButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};


export default ConfigButton;
