import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import caccl
import initCACCL from 'caccl/client/cached';

// Import other components
import AssignmentGroups from './AssignmentGroups';
import Rules from './Rules';
import LoadingSpinner from '../../shared/LoadingSpinner';
import Modal from '../../shared/Modal';
import ConfigurationFooter from './ConfigurationFooter';

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
      // Current grace period from form
      currentGracePeriodMin: String(initialGracePeriodMin),
      // Current max late days per semester from form
      currentMaxLateDaysPerSemester: String(initialMaxLateDaysPerSemester),
      // current max late days per assignment from form
      currentMaxLateDaysPerAssignment: String(initialMaxLateDaysPerAssignment),
      // current assignment groups checked
      currentAssignmentGroupIdsToCount: initialAssignmentGroupIdsToCount,
    };
  }

  attemptSave() {
    this.saving = (
      // Make sure all options exists
      this.currentGracePeriodMin
      && this.currentMaxLateDaysPerAssignment
      && this.currentMaxLateDaysPerSemester
      && this.currentAssignmentGroupIdsToCount
      // Make sure they have the right types
      && typeof (this.currentGracePeriodMin) === 'string'
      && typeof (this.currentMaxLateDaysPerAssignment) === 'string'
      && typeof (this.currentMaxLateDaysPerSemester) === 'string'
      && Array.isArray(this.initialAssignmentGroupIdsToCount)
      // Make sure numbers are in the proper range
      && Number(this.currentGracePeriodMin) >= 0
      && Number(this.currentMaxLateDaysPerSemester) > 0
      && Number(this.currentMaxLateDaysPerAssignment) > 0
      // Make sure caps make sense
      && this.currentMaxLateDaysPerSemester >= this.currentMaxLateDaysPerAssignment
      // Make sure there is at least one assignment group selected
      && this.currentAssignmentGroupIdsToCount.length >= 1
    );

    if (!this.saving) {
      this.setState({
        validationErrorText: 'Your input is incorrect, please look over the form and fix any errors.',
      });
    }
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
          onMaxLateDaysPerSemesterChanged={(newMaxLateDaysPerSemester) => {
            this.setState({
              currentMaxLateDaysPerSemester: newMaxLateDaysPerSemester,
            });
          }}
          onMaxLateDaysPerAssignmentChanged={(newMaxLateDaysPerAssignment) => {
            this.setState({
              currentMaxLateDaysPerAssignment: newMaxLateDaysPerAssignment,
            });
          }}
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
        <ConfigurationFooter />
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
  // The initial number of late days per semester
  initialMaxLateDaysPerSemester: PropTypes.number,
  // The initial number of late days per assignment
  initialMaxLateDaysPerAssignment: PropTypes.number,
  // The initial assignment group ids that are checked
  initialAssignmentGroupIdsToCount: PropTypes.arrayOf(PropTypes.number),
};

Configuration.defaultProps = {
  // By default, there is no cancel button
  onCancel: null,
  // By default, the initial grace period is 5 minutes
  initialGracePeriodMin: 5,
  // By default, the initial max late days per semester is 6 days
  initialMaxLateDaysPerSemester: 6,
  // By default, the initial max late days per assignment is 2 days
  initialMaxLateDaysPerAssignment: 2,
  // By default, there are no initial assignment group ids checked
  initialAssignmentGroupIdsToCount: [],
};

export default Configuration;
