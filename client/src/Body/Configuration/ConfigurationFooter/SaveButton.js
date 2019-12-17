import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import FontAwesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';

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
          className="btn btn-info btn-lg"
          onClick={onSaveClicked}
        >
          <FontAwesomeIcon icon={faSave} className="mr-2" />
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
