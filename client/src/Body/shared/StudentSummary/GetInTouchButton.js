import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import FontAwesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

// import styles
import './GetInTouchButton.css';

class GetInTouchButton extends Component {
  /**
   * Render GetInTouchButton
   */
  render() {
    const {
      onClick,
    } = this.props;

    const text = 'Get in Touch';

    return (
      <div className="getintouchbutton-container d-flex pt-4">
        <button
          type="button"
          className="btn btn-primary btn-lg"
          onClick={onClick}
        >
          <FontAwesomeIcon
            icon={faEnvelope}
            className="mr-3"
          />
          {text}
        </button>
      </div>
    );
  }
}

GetInTouchButton.propTypes = {
  // function that emails student when clicked
  onClick: PropTypes.func.isRequired,
};

export default GetInTouchButton;
