import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import FontAwesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';

class ByAssignmentButton extends Component {
  /**
   * Render ByAssignmentButton
   */
  render() {
    const {
      onClick,
    } = this.props;

    return (
      <div className="byassignmentbutton-container">
        <button
          type="button"
          className="btn btn-primary btn-lg dashboard-btn font-weight-bold"
          onClick={onClick}
        >
          <FontAwesomeIcon
            icon={faList}
            className="mr-1"
          />
          View Late Days by Assignment
        </button>
      </div>
    );
  }
}

ByAssignmentButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};


export default ByAssignmentButton;
