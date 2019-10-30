import React, { Component } from 'react';
import PropTypes from 'prop-types';
class ByAssignmentButton extends Component {
  /**
   * Render ByAssignmentButton
   */
  render() {
    const {
      onClick,
    } = this.props;
    
    return (
      <div>
        ByAssignmentButton has not been created yet
      </div>
    );
}


ByAssignmentButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};


export default ByAssignmentButton;