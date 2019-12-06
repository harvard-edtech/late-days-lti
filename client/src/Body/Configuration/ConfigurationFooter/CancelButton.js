import React, { Component } from 'react';
import PropTypes from 'prop-types';
class CancelButton extends Component {
  /**
   * Render CancelButton
   */
  render() {
    const {
      onCancelClicked,
    } = this.props;

    return (
      <div className="cancelbutton-container">
        <button type="button" className="btn btn-secondary btn-lg">Cancel</button>
      </div>
    );
  }
}


CancelButton.propTypes = {
  onCancelClicked: PropTypes.func.isRequired,
};


export default CancelButton;
