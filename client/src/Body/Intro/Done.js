/**
 * Message to show while animating out
 * @author Gabe Abrams
 */

// Import React
import React, { Component } from 'react';

class Done extends Component {
  render() {
    return (
      <div className="Intro-panel-container">
        <div className="Intro-panel alert alert-light">
          <div className="d-flex flex-row justify-content-center align-items-center h-100">
            <div>
              <div className="Intro-text-large font-weight-bold">
                Next: Configuration
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Done;
