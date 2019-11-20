import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import caccl
import initCACCL from 'caccl/client/cached';

// Import other components
import AssignmentGroups from './AssignmentGroups';
import Rules from './Rules';
import LoadingSpinner from '../../shared/LoadingSpinner';
import Modal from '../../shared/Modal';

// Import constants
import METADATA_ID from '../../METADATA_ID';

// Import styles
import './Configuration.css';

// Initialize caccl
const { api } = initCACCL();

class Configuration extends Component {
  constructor(props) {
    super(props);

    // Deconstruct props
    const {
      initialGracePeriodMin,
      initialMaxLateDaysPerSemester,
      initialMaxLateDaysPerAssignment,
      initialAssignmentGroupIdsToCount,
    } = this.props;

    // Initialize state
    this.state = {
      // If true, the configuration is being saved
      saving: false,
      // Validation error to show in a modal
      validationErrorText: null,
      // TODO: add comments
      currentGracePeriodMin: String(initialGracePeriodMin),
      currentMaxLateDaysPerSemester: String(initialMaxLateDaysPerSemester),
      currentMaxLateDaysPerAssignment: String(initialMaxLateDaysPerAssignment),
      currentAssignmentGroupIdsToCount: initialAssignmentGroupIdsToCount,
    };
  }

  attemptSave() {
    // TODO: validate the current values. If they're invalid, show an error
    // in a modal (set validationErrorText to something)
  }

  /**
   * Render Configuration
   */
  render() {
    const {
      assignmentGroups,
      onNewMetadata,
      onCancel,
    } = this.props;
    const {
      saving,
      currentGracePeriodMin,
      currentMaxLateDaysPerSemester,
      currentMaxLateDaysPerAssignment,
      currentAssignmentGroupIdsToCount,
      validationErrorText,
    } = this.state;

    // Show saving spinner
    if (saving) {
      return (
        <LoadingSpinner />
      );
    }

    // Show validation error
    const validationModal = (
      (validationErrorText && validationErrorText.length > 0)
        ? (
          <Modal
            title="Please fix the following:"
            type="okay"
            body={validationErrorText}
            onClose={() => {
              this.setState({
                validationErrorText: null,
              });
            }}
          />
        )
        : null
    );

    return (
      <div className="configuration-container content-container">
        {validationModal}
        <Rules
          gracePeriodMin={currentGracePeriodMin}
          onGracePeriodChanged={(newGracePeriodMin) => {
            this.setState({
              currentGracePeriodMin: newGracePeriodMin,
            });
          }}
          maxLateDaysPerAssignment={currentMaxLateDaysPerAssignment}
          maxLateDaysPerSemester={currentMaxLateDaysPerSemester}
        />
        <AssignmentGroups
          assignmentGroups={assignmentGroups}
          currentAssignmentGroupIdsToCount={currentAssignmentGroupIdsToCount}
          onChange={(assignmentGroupId, isBeingAdded) => {
            let currIds = currentAssignmentGroupIdsToCount;

            if (isBeingAdded) {
              // Add the id
              currIds.push(assignmentGroupId);
            } else {
              // Remove the id
              currIds = (
                currIds
                  .filter((val) => {
                    return (val !== assignmentGroupId);
                  })
              );
            }

            // Save
            this.setState({
              currentAssignmentGroupIdsToCount: currIds,
            });
          }}
        />
      </div>
    );
  }
}

Configuration.propTypes = {
  // The list of assignment groups to let the user choose from
  assignmentGroups: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  // The id of the course we launched from
  courseId: PropTypes.number.isRequired,
  // Handler for when configuration is valid & saved (called with new metadata)
  onNewMetadata: PropTypes.func.isRequired,
  // Handler for when user cancels (if excluded, no cancel allowed)
  onCancel: PropTypes.func,
  // Initial number of grace period minutes
  initialGracePeriodMin: PropTypes.number,
  // TODO: write docs
  initialMaxLateDaysPerSemester: PropTypes.number,
  initialMaxLateDaysPerAssignment: PropTypes.number,
  initialAssignmentGroupIdsToCount: PropTypes.arrayOf(PropTypes.number),
};

Configuration.defaultProps = {
  // By default, there is no cancel button
  onCancel: null,
  // TODO: write docs
  initialGracePeriodMin: 5,
  initialMaxLateDaysPerSemester: 6,
  initialMaxLateDaysPerAssignment: 2,
  initialAssignmentGroupIdsToCount: [],
};

export default Configuration;
