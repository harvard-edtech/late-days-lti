import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CancelButton from './CancelButton';
import SaveButton from './SaveButton';

// import stylesheet
import './style.css';

class ConfigurationFooter extends Component {
  /**
   * Render ConfigurationFooter
   */
  render() {
    const {
      onSaveClicked,
      onCancelClicked,
    } = this.props;

    // Cancel button only appears when onCancelClick function given
    const cancelButton = (
      onCancelClicked
        ? (
          <div className="configurationfooter-cancel">
            <CancelButton
              onCancelClicked={onCancelClicked}
            />
          </div>
        )
        : null
    );

    return (
      <div className="configurationfooter-container">
        {cancelButton}
        <SaveButton
          onSaveClicked={onSaveClicked}
        />
      </div>
    );
  }
}

ConfigurationFooter.propTypes = {
  // Saves metadata if valid when clicked
  onSaveClicked: PropTypes.func.isRequired,
  // Reverts input fields back to original input when clicked (?)
  onCancelClicked: PropTypes.func,
};

ConfigurationFooter.defaultProps = {
  // By default, there is no cancel button
  onCancelClicked: null,
};


export default ConfigurationFooter;
