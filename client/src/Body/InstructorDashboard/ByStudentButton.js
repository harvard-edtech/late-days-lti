import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import FontAwesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';

class ByStudentButton extends Component {
  /**
   * Render ByStudentButton
   */
  render() {
    const {
      onClick,
    } = this.props;

    return (
      <div className="bystudentbutton-container">
        <button
          type="button"
          className="btn btn-primary btn-lg dashboard-btn mb-3 font-weight-bold"
          onClick={onClick}
        >
          <FontAwesomeIcon
            icon={faUsers}
            className="mr-1"
          />
          View Late Days by Student
        </button>
      </div>
    );
  }
}

ByStudentButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};


export default ByStudentButton;
