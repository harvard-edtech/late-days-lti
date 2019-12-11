import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AssignmentGroupItem from './AssignmentGroupItem';

// import style
import './style.css';

class AssignmentGroupList extends Component {
  /**
   * Render AssignmentGroupList
   */
  render() {
    const {
      assignmentGroups,
      onChange,
      currentAssignmentGroupIdsToCount,
    } = this.props;

    let counter = 0;
    const assignmentGroupsRender = assignmentGroups.map((group) => {
      counter += 1;
      return (
        <div key={`${group.name}-${counter}`}>
          <div className="assignmentgrouplist-elem">
            <AssignmentGroupItem
              name={group.name}
              id={group.id}
              onChange={onChange}
              currentAssignmentGroupIdsToCount={currentAssignmentGroupIdsToCount}
            />
          </div>
        </div>
      );
    });
    return (
      <div className="assignmentgrouplist-container">
        {assignmentGroupsRender}
      </div>
    );
  }
}

AssignmentGroupList.propTypes = {
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

export default AssignmentGroupList;
