import React, { Component } from 'react';

class SetupErrorMessage extends Component {
  /**
   * Render SetupErrorMessage
   */
  render() {
    return (
      <div className="setuperrormessage-container text-center">
        <h1>Please Come Back Later</h1>
        <h3>Your instructor hasn't set up late days yet.</h3>
      </div>
    );
  }
}

export default SetupErrorMessage;
