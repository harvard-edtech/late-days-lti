import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AssignmentGroupItem from './AssignmentGroupItem';

class AssignmentGroupList extends Component {
  /**
   * Render AssignmentGroupList
   */
  render() {
    const {
      assignmentGroups,
    } = this.props;

    let counter = 0;
    const assignmentGroupsRender = assignmentGroups.map((group) => {
      counter += 1;
      return (
        <div key={`${group.name}-${counter}`}>
          <div className="assignmentgrouplist-elem">
            <AssignmentGroupItem
              name={group.name}
            />
          </div>
        </div>
      );
    });
    return (
      <div>
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
};

export default AssignmentGroupList;
