import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AssignmentGroupList from './AssignmentGroupList';
import DueDateRequiredNote from './DueDateRequiredNote';

class AssignmentGroups extends Component {
  /**
   * Render AssignmentGroups
   */
  render() {
    const {
      assignmentGroups,
      currentAssignmentGroupIdsToCount,
      onChange,
    } = this.props;

    return (
      <div className="assignmentgroups-container alert alert-info pl-3 pr-3 pb-3 pt-1 mt-2">
        <h3 className="assignmentgroup-header">
          Assignment Groups
        </h3>
        <div className="alert alert-light text-dark mb-0">
          <h3 className="assignmentgroup-maindescription m-0">
            Count Late Days for Assignments in these Assignment Groups:
          </h3>
          <p className="assignmentgroup-subdescription lead m-0">
            Also, we will ignore assignments that do not have a due dates.
          </p>
          <div className="assignmentgroup-items">
            <AssignmentGroupList
              assignmentGroups={assignmentGroups}
              onChange={onChange}
              currentAssignmentGroupIdsToCount={
                currentAssignmentGroupIdsToCount
              }
            />
          </div>
        </div>
      </div>
    );
  }
}

AssignmentGroups.propTypes = {
  // The list of assignment groups to let the user choose from
  assignmentGroups: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  // Currently checked assignment group ids
  currentAssignmentGroupIdsToCount:
    PropTypes.arrayOf(PropTypes.number).isRequired,
  // Handler for when assignment group checkboxes are changed
  onChange: PropTypes.func.isRequired,
  // ^ call with two arguments: (id, isBeingAdded)
};

AssignmentGroups.defaultProps = {};

export default AssignmentGroups;
