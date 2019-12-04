import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AssignmentGroupList from './AssignmentGroupList';
import AssignmentGroupsFooter from './AssignmentGroupsFooter';
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
          <h4 className="assignmentgroup-maindescription">
            Count Late Days for Assignments in these Assignment Groups:
          </h4>
          <h6 className="assignmentgroup-subdescription">
            (Assignment must have due dates for students to use late days)
          </h6>
          <div className="assignmentgroup-items">
            <AssignmentGroupList
              assignmentGroups={assignmentGroups}
              onChange={onChange}
              currentAssignmentGroupIdsToCount={currentAssignmentGroupIdsToCount}
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
