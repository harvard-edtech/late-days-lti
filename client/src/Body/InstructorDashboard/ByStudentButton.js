import React, { Component } from 'react';
import PropTypes from 'prop-types';
class ByStudentButton extends Component {
  /**
   * Render ByStudentButton
   */
  render() {
    const {
      onClick,
    } = this.props;
    
    return (
      <div>
        ByStudentButton has not been created yet
      </div>
    );
}


ByStudentButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};


export default ByStudentButton;