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
      noAssignmentsYet,
      includedAssignmentGroups,
    } = this.props;

    const assignmentGroupNameParts = (
      includedAssignmentGroups
        .map((assignmentGroup, i) => {
          const { name, id } = assignmentGroup;

          const comma = (
            (
              i !== includedAssignmentGroups.length - 1
              && includedAssignmentGroups.length > 2
            )
              ? (
                <span>
                  ,&nbsp;
                </span>
              )
              : ''
          );
          const spaceBeforeAnd = (
            (
              includedAssignmentGroups.length === 2
              && i === 1
            )
              ? (
                <span>
                  &nbsp;
                </span>
              )
              : null
          );
          const and = (
            (
              i === includedAssignmentGroups.length - 1
              && includedAssignmentGroups.length > 1
            )
              ? (
                <span>
                  and&nbsp;
                </span>
              )
              : ''
          );
          return (
            <span key={`InstructorDashboard-grouplist-${id}`}>
              {spaceBeforeAnd}
              {and}
              <em>
                {name}
              </em>
              {comma}
            </span>
          );
        })
    );

    const lateDayDataBody = (
      noAssignmentsYet
        ? (
          <div className="alert alert-info mt-2">
            <div className="font-weight-bold">
              No Assignments Yet!
            </div>
            <div>
              Your current configuration lets students use Late Days on
              assignments in the following assignment group
              {includedAssignmentGroups.length === 1 ? '' : 's'}
              :&nbsp;
              {assignmentGroupNameParts}
              .
              Once there are assignments in&nbsp;
              {includedAssignmentGroups.length === 1 ? 'that' : 'any of those'}
              &nbsp;group
              {includedAssignmentGroups.length === 1 ? '' : 's'}
              ,
              you&apos;ll find useful features here.
              Alternatively, you can update your configuration to include other
              assignment groups.
            </div>
          </div>
        )
        : (
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
        )
    );

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

        {lateDayDataBody}

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
  // List of assignment group names that are included in the count
  includedAssignmentGroups: PropTypes.arrayOf(PropTypes.shape({
    // The assignment group's name
    name: PropTypes.string.isRequired,
    // The assignment group's id
    id: PropTypes.number.isRequired,
  })).isRequired,
  // True if there are no assignments to count yet
  noAssignmentsYet: PropTypes.bool.isRequired,
};


export default InstructorDashboard;
