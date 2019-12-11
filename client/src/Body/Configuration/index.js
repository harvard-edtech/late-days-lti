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

    // Bind handlers
    this.attemptSave = this.attemptSave.bind(this);
  }

  attemptSave() {
    // Deconstruct state
    const {
      currentGracePeriodMin,
      currentMaxLateDaysPerSemester,
      currentMaxLateDaysPerAssignment,
      currentAssignmentGroupIdsToCount,
    } = this.state;

    // Deconstruct props
    const {
      onNewMetadata,
    } = this.props;

    // Validate grace period
    if (!currentGracePeriodMin || currentGracePeriodMin.trim().length === 0) {
      // No grace period
      return this.setState({
        validationErrorText: 'Please provide a grace period. Put zero for no grace period.',
      });
    }

    const gracePeriodMin = parseInt(currentGracePeriodMin, 10);

    if (!Number.isInteger(gracePeriodMin)) {
      // grace period is not an integer
      return this.setState({
        validationErrorText: 'The grace period should be an integer.',
      });
    }

    if (gracePeriodMin < 0) {
      // grace period needs to be 0 or positive
      return this.setState({
        validationErrorText: 'The grace period must be 0 or a positive number.',
      });
    }

    // Validate max late days per assignment
    if (!currentMaxLateDaysPerAssignment
      || currentMaxLateDaysPerAssignment.trim().length === 0) {
      // No max late days per assignment
      return this.setState({
        validationErrorText: 'Please provide a max late day per assignment.',
      });
    }

    const maxLateDaysPerAssignment = parseInt(
      currentMaxLateDaysPerAssignment,
      10
    );

    if (!Number.isInteger(maxLateDaysPerAssignment)) {
      // Check max late days per assignment is an integer
      return this.setState({
        validationErrorText: 'The max late days per assignment should be an integer.',
      });
    }

    if (maxLateDaysPerAssignment < 1) {
      // max late days per assignment is positive or 1
      return this.setState({
        validationErrorText: 'The max late days per assignment must be greater than 0',
      });
    }
    // Validate max late days per semester
    if (!currentMaxLateDaysPerSemester
      || currentMaxLateDaysPerSemester.trim().length === 0) {
      // No max late days per semester
      return this.setState({
        validationErrorText: 'Please provide a max late day per semester.',
      });
    }

    const maxLateDaysPerSemester = parseInt(
      currentMaxLateDaysPerSemester,
      10
    );

    if (!Number.isInteger(maxLateDaysPerSemester)) {
      // Check max late days per semester is an integer
      return this.setState({
        validationErrorText: 'The max late days per semester should be an integer.',
      });
    }

    if (maxLateDaysPerSemester < 1) {
      // max late days per semester is positive or 1
      return this.setState({
        validationErrorText: 'The max late days per semester must be greater than 0',
      });
    }

    if (maxLateDaysPerSemester < maxLateDaysPerAssignment) {
      // max late days per semester is positive or 1
      return this.setState({
        validationErrorText: 'The max late days per semester must be greater than max late days per assignment',
      });
    }

    // Validate assignment group ids
    if (!currentAssignmentGroupIdsToCount) {
      // No assignment groups checked
      return this.setState({
        validationErrorText: 'Please make at least one assignment group.',
      });
    }

    const assignmentGroupIdsToCount = currentAssignmentGroupIdsToCount;

    if (assignmentGroupIdsToCount.length < 1) {
      return this.setState({
        validationErrorText: 'Please check off at least one assignment group.',
      });
    }

    // Create metadata object & update caccl-api
    const configuration = {
      gracePeriodMin,
      maxLateDaysPerSemester,
      maxLateDaysPerAssignment,
      assignmentGroupIdsToCount,
    };
    onNewMetadata(configuration);
  }

  /**
   * Render Configuration
   */
  render() {
    // Deconstruct props
    const {
      assignmentGroups,
      onNewMetadata,
      onCancel,
    } = this.props;

    // Deconstruct state
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

    // TODO: Delete this next line (debug statement)
    console.log('CURRENT: ', currentGracePeriodMin);

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
        <ConfigurationFooter
          onCancelClicked={onCancel}
          onSaveClicked={this.attemptSave}
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
