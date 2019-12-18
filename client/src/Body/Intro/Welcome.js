/**
 * The first intro screen for SwipeIn
 * @author Gabe Abrams
 */

// Import React
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import style
import './Welcome.css';

class Welcome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // If true, the words should be flying off screen
      flyingOff: false,
    };

    setTimeout(() => {
      this.setState({
        flyingOff: true,
      });

      // Call onContinue after the animation
      setTimeout(props.onContinue, 500);
    }, 3000);
  }

  /**
   * Render Welcome
   */
  render() {
    const { flyingOff } = this.state;

    return (
      <div className="Intro-vertically-fill-screen">
        <div className="d-flex align-items-center justify-content-center flex-row Intro-vertically-fill-screen">
          <h1
            className="Welcome-title"
            style={{
              transform: (
                flyingOff
                  ? 'scale(0.6)'
                  : 'scale(1)'
              ),
              opacity: (flyingOff ? 0 : 1),
            }}
          >
            <div>
              <div className="Welcome-word Welcome-word-1">Welcome&nbsp;</div>
              <div className="Welcome-word Welcome-word-2">to</div>
            </div>
            <div className="Welcome-word Welcome-word-3">LateDays</div>
          </h1>
        </div>
      </div>
    );
  }
}

// List or properties and their types
Welcome.propTypes = {
  // Handler to call when done with this step
  onContinue: PropTypes.func.isRequired,
};

export default Welcome;
