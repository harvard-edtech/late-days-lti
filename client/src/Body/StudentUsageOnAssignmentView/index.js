import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ItemList from '../../shared/ItemList';

class StudentUsageOnAssignmentView extends Component {
  /**
   * Render StudentUsageOnAssignmentView
   */
  render() {
    const {
      students,
      assignment,
      lateDaysMapForEveryone,
      maxLateDaysPerAssignment,
    } = this.props;

    const items = students.map((student) => {
      const lateDaysUsed = (
        lateDaysMapForEveryone[student.id][assignment.id] || 0
      );

      return {
        name: student.name,
        value: lateDaysUsed,
      };
    });

    return (
      <div className="studentusageonassignmentview-container content-container">
        <h1 className="studentusageonassignmentview-header text-center">
          Late Days for&nbsp;
          <span className="font-weight-light">
            {assignment.name}
          </span>
        </h1>
        <div className="studentusageonassignmentview-items">
          <ItemList
            items={items}
            valueDenominator={maxLateDaysPerAssignment}
            nameHeader="Student"
            valueHeader="Late Days Used"
            valueSuffix="Used"
          />
        </div>
      </div>
    );
  }
}

StudentUsageOnAssignmentView.propTypes = {
  // Students
  students: PropTypes.arrayOf(
    PropTypes.shape({
      // the name of the student
      name: PropTypes.string.isRequired,
      // the id of the student
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
  // The current assignment
  assignment: PropTypes.shape({
    // The name of the assignment
    name: PropTypes.string.isRequired,
    // The id of the assignment
    id: PropTypes.number.isRequired,
  }).isRequired,
  // Late days usage map
  lateDaysMapForEveryone: PropTypes.objectOf(
    PropTypes.objectOf(PropTypes.number)
  ).isRequired,
  // The number of late days allowed per assignment
  maxLateDaysPerAssignment: PropTypes.number.isRequired,
};


export default StudentUsageOnAssignmentView;
