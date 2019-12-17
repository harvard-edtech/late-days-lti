import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import FontAwesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPointer } from '@fortawesome/free-solid-svg-icons';

// Import other components
import ItemList from '../../shared/ItemList';

class AssignmentUsageOverview extends Component {
  /**
   * Render AssignmentUsageOverview
   */
  render() {
    const {
      assignments,
      lateDaysMapForEveryone,
      maxLateDaysPerAssignment,
      onAssignmentClicked,
    } = this.props;

    const denominator = Object.values(lateDaysMapForEveryone);
    const items = assignments.map((assignment) => {
      let avgLateDays = 0;
      if (denominator > 0) {
        const lateDayValues = (
          Object.values(lateDaysMapForEveryone)
            .map((lateDaysMap) => {
              return lateDayValues[lateDaysMap[assignment.id]] || 0;
            })
        );
        const numerator = (
          lateDayValues.reduce((a, b) => {
            return a + b;
          }, 0)
        );
        avgLateDays = Math.round(100 * (numerator / denominator)) / 100;
      }

      return {
        name: assignment.name,
        value: avgLateDays,
        dueAt: new Date(assignment.due_at),
        onClick: () => {
          onAssignmentClicked(assignment);
        },
      };
    });

    return (
      <div className="AssignmentUsageOverview-container content-container">
        <h1 className="AssignmentUsageOverview-header text-center">
          Average Late Days by Assignment
        </h1>

        <div className="text-center mb-5">
          <div className="alert alert-info d-inline-block">
            <FontAwesomeIcon icon={faHandPointer} className="mr-2" />
            <strong>Click&nbsp;</strong>
            an assignment to see how many late days each student
            used on that assignment
          </div>
        </div>

        <div className="AssignmentUsageOverview-items">
          <ItemList
            items={items}
            valueDenominator={maxLateDaysPerAssignment}
            nameHeader="Assignment"
            dueAtHeader="Due At"
            valueHeader="Average Late Days"
            valueSuffix="Used"
            showDueAt
          />
        </div>
      </div>
    );
  }
}

AssignmentUsageOverview.propTypes = {
  // Assignments
  assignments: PropTypes.arrayOf(
    PropTypes.shape({
      // the name of the assignment
      name: PropTypes.string.isRequired,
      // the id of the assignment
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
  // Late days usage map
  lateDaysMapForEveryone: PropTypes.objectOf(
    PropTypes.objectOf(PropTypes.number)
  ).isRequired,
  // The number of late days allowed per assignment
  maxLateDaysPerAssignment: PropTypes.number.isRequired,
  // Handler for when user clicks an assignment
  // @param {object} assignment - the assignment that was clicked
  onAssignmentClicked: PropTypes.func.isRequired,
};


export default AssignmentUsageOverview;
