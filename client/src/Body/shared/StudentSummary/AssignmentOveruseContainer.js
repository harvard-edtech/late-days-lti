import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ItemRows from '../../../shared/ItemList/ItemRows';

// Import sort types
import SORT_TYPES from '../../../shared/ItemList/SORT_TYPES';

import './AssignmentOveruseContainer.css';

class AssignmentOveruseContainer extends Component {
  /**
   * Render AssignmentOveruseContainer
   */
  render() {
    const {
      maxLateDaysPerAssignment,
      assignmentsToShow,
      valueSuffix,
    } = this.props;

    const heading = `Too many late days used in ${assignmentsToShow.length} assignment${(assignmentsToShow.length > 1) ? 's' : ''}.`;

    return (
      <div className="assignmentoverusecontainer-container alert alert-danger text-dark font-weight-bold m-3">
        <div className="assignmentoverusecontainer-heading">
          {heading}
        </div>
        <div className="assignmentoverusecontainer-items alert alert-light text-dark mt-3 mr-2 ml-2">
          <ItemRows
            items={assignmentsToShow}
            valueDenominator={maxLateDaysPerAssignment}
            valueSuffix={valueSuffix}
            sortType={SORT_TYPES.BY_NAME}
          />
        </div>
      </div>
    );
  }
}

AssignmentOveruseContainer.propTypes = {
  // max number of late days per assignment
  maxLateDaysPerAssignment: PropTypes.number.isRequired,
  // array of assignments that overused late days to display
  assignmentsToShow: PropTypes.arrayOf(
    PropTypes.shape({
      // the name of assignment
      name: PropTypes.string.isRequired,
      // item's value (number of tokens used)
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
  // String to display after the value fraction
  valueSuffix: PropTypes.string.isRequired,
};


export default AssignmentOveruseContainer;
