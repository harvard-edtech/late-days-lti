import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

    return (
      <div className="getintouchbutton-container d-flex pt-4">
        <button
          type="button"
          className="btn btn-primary btn-lg"
          onClick={onClick}
        >
          Get in Touch
        </button>
      </div>
    );
  }
}

GetInTouchButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default GetInTouchButton;
