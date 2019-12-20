/**
 * Message to show while animating out
 * @author Gabe Abrams
 */

// Import React
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Done extends Component {
  render() {
    const { firstTime } = this.props;

    const message = (
      firstTime
        ? 'Next: Configuration'
        : 'You\'re done!'
    );

    return (
      <div className="Intro-panel-container">
        <div className="Intro-panel alert alert-light">
          <div className="d-flex flex-row justify-content-center align-items-center h-100">
            <div>
              <div className="Intro-text-large font-weight-bold">
                {message}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Done.propTypes = {
  // If true, this is the user's first time watching the tutorial
  firstTime: PropTypes.bool.isRequired,
};

export default Done;
