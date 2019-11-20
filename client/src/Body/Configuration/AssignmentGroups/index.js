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
    return (
      <div>
        AssignmentGroups has not been created yet
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
