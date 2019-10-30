import React, { Component } from 'react';
import PropTypes from 'prop-types';
class CancelButton extends Component {
  /**
   * Render CancelButton
   */
  render() {
    const {
      onClick,
    } = this.props;
    
    return (
      <div>
        CancelButton has not been created yet
      </div>
    );
}


CancelButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};


export default CancelButton;
