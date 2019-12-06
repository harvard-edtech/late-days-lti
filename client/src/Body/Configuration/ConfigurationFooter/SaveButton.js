import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SaveButton extends Component {
  /**
   * Render SaveButton
   */
  render() {
    const {
      onSaveClicked,
    } = this.props;

    return (
      <div className="savebutton-container pl-1">
        <button
          type="button"
          className="btn btn-success btn-lg"
          onClick={onSaveClicked}
        >
          Save
        </button>
      </div>
    );
  }
}

SaveButton.propTypes = {
  onSaveClicked: PropTypes.func.isRequired,
};


export default SaveButton;
