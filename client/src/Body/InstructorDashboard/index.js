import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import FontAwesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faUsers, faList } from '@fortawesome/free-solid-svg-icons';

// Style
import './style.css';

class InstructorDashboard extends Component {
  /**
   * Render InstructorDashboard
   */
  render() {
    const {
      onShowConfiguration,
      onShowLateDaysByStudent,
      onShowLateDaysByAssignment,
    } = this.props;

    return (
      <div className="InstructorDashboard content-container">
        <button
          type="button"
          className="btn btn-lg btn-block btn-info"
          aria-label="Click to change configuration"
          onClick={onShowConfiguration}
        >
          <FontAwesomeIcon
            icon={faCog}
            className="mr-2"
          />
          Configuration
        </button>
        <button
          type="button"
          className="btn btn-lg btn-block btn-info"
          aria-label="Click to show late day breakdown by student"
          onClick={onShowLateDaysByStudent}
        >
          <FontAwesomeIcon
            icon={faUsers}
            className="mr-2"
          />
          Late Days by Student
        </button>
        <button
          type="button"
          className="btn btn-lg btn-block btn-info"
          aria-label="Click to show late day breakdown by assignment"
          onClick={onShowLateDaysByAssignment}
        >
          <FontAwesomeIcon
            icon={faList}
            className="mr-2"
          />
          Late Days by Assignment
        </button>
      </div>
    );
  }
}

InstructorDashboard.propTypes = {
  // Handler to call when configuration button is clicked
  onShowConfiguration: PropTypes.func.isRequired,
  // Handler to call when late days by student button is clicked
  onShowLateDaysByStudent: PropTypes.func.isRequired,
  // Handler to call when late days by assignment button is clicked
  onShowLateDaysByAssignment: PropTypes.func.isRequired,
};


export default InstructorDashboard;
