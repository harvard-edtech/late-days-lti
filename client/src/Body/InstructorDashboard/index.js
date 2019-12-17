import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import FontAwesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCog,
  faUsers,
  faList,
  faQuestionCircle,
} from '@fortawesome/free-solid-svg-icons';

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
      onShowIntro,
    } = this.props;

    return (
      <div className="InstructorDashboard content-container">
        <h1 className="text-center">
          Home
        </h1>

        <hr />

        <h2>
          Info and Configuration:
        </h2>

        <div className="row">
          <div className="col-md">
            <button
              type="button"
              className="btn btn-lg btn-block btn-secondary"
              aria-label="Click to re-watch the tutorial"
              onClick={onShowIntro}
            >
              <FontAwesomeIcon
                icon={faQuestionCircle}
                className="mr-2"
              />
              Re-watch Tutorial
            </button>
          </div>
          <div className="col-md">
            <button
              type="button"
              className="btn btn-lg btn-block btn-secondary"
              aria-label="Click to change configuration"
              onClick={onShowConfiguration}
            >
              <FontAwesomeIcon
                icon={faCog}
                className="mr-2"
              />
            Change Configuration
            </button>
          </div>
        </div>

        <h2 className="mt-5">
          View Late Day Data:
        </h2>

        <div className="row">
          <div className="col-md">
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
          </div>
          <div className="col-md">
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
        </div>

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
  // Handler to call wehn intro button is clicked
  onShowIntro: PropTypes.func.isRequired,
};


export default InstructorDashboard;
