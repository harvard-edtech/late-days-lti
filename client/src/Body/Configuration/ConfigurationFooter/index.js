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

    return (
      <div className="configurationfooter-container">
        <CancelButton
          onCancelClicked={onCancelClicked}
        />
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
  onCancelClicked: PropTypes.func.isRequired,
};


export default ConfigurationFooter;
