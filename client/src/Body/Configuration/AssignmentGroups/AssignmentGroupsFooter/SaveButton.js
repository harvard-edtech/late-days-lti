import React, { Component } from 'react';
import PropTypes from 'prop-types';
class SaveButton extends Component {
  /**
   * Render SaveButton
   */
  render() {
    const {
      onClick,
    } = this.props;

    return (
      <div>
        SaveButton has not been created yet
      </div>
    );
  }
}

SaveButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};


export default SaveButton;