import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import FontAwesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

// Import styles
import './AssignmentOveruseContainer.css';

class AssignmentOveruseContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // True if visible
      visible: true,
    };
  }

  /**
   * Render AssignmentOveruseContainer
   */
  render() {
    const { assignmentsToShow } = this.props;
    const { visible } = this.state;

    // Don't render if not visible
    if (!visible) {
      return (
        <div />
      );
    }

    const assignmentNames = (
      assignmentsToShow
        .map((assignment, i) => {
          const comma = (
            (i !== assignmentsToShow.length - 1 && assignmentsToShow.length > 2)
              ? ','
              : ''
          );
          const and = (
            (
              i === assignmentsToShow.length - 1
              && assignmentsToShow.length > 1
            )
              ? 'and '
              : ''
          );
          return `${and}${assignment.name}${comma}`;
        })
        .join(' ')
    );

    const heading = `Used too many late days on ${assignmentsToShow.length} assignment${(assignmentsToShow.length > 1) ? 's' : ''}:`;

    return (
      <div className="assignmentoverusecontainer-container alert alert-secondary mt-3" role="alert">
        <button
          type="button"
          className="close"
          style={{
            opacity: 1,
          }}
          data-dismiss="alert"
          aria-label="close"
          onClick={() => {
            this.setState({
              visible: false,
            });
          }}
        >
          <span
            aria-hidden="true"
          >
            &times;
          </span>
        </button>
        <div className="assignmentoverusecontainer-heading">
          <FontAwesomeIcon
            icon={faExclamationTriangle}
            className="mr-2"
          />
          {heading}
        </div>
        <div className="assignmentoverusecontainer-subheading">
          {assignmentNames}
        </div>
      </div>
    );
  }
}

AssignmentOveruseContainer.propTypes = {
  // array of assignments that overused late days to display
  assignmentsToShow: PropTypes.arrayOf(
    PropTypes.shape({
      // the name of assignment
      name: PropTypes.string.isRequired,
      // item's value (number of tokens used)
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
};


export default AssignmentOveruseContainer;
