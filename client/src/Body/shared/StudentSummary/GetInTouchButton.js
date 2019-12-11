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
      link,
    } = this.props;

    return (
      <div className="getintouchbutton-container d-flex pt-4">
        <a
          className="btn btn-secondary btn-lg"
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="click to get in touch with the student via Canvas"
        >
          <FontAwesomeIcon
            icon={faEnvelope}
            className="mr-3"
          />
          Get in Touch
        </a>
      </div>
    );
  }
}

GetInTouchButton.propTypes = {
  // The link to follow to get in touch with the student
  link: PropTypes.string.isRequired,
};

export default GetInTouchButton;
