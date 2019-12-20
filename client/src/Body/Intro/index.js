/**
 * The success message after creating an event
 * @author Gabe Abrams
 */

// Import React
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import steps
import Welcome from './Welcome';
import Description from './Description';
import WhatIsALateDay from './WhatIsALateDay';
import MaxPerTerm from './MaxPerTerm';
import GracePeriod from './GracePeriod';
import AssignmentGroupSelection from './AssignmentGroupSelection';
import Tracking from './Tracking';
import Done from './Done';

// Import style
import './style.css';

// List steps
const STEPS = [
  Welcome,
  Description,
  WhatIsALateDay,
  MaxPerTerm,
  GracePeriod,
  AssignmentGroupSelection,
  Tracking,
  Done,
];

class Intro extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // The index of the current step
      stepIndex: 0,
      // If true, we are animating out
      leaving: false,
    };
  }

  /**
   * Render Intro
   */
  render() {
    const {
      onFinish,
      firstTime,
    } = this.props;
    const {
      stepIndex,
      leaving,
    } = this.state;

    // Find the current step
    const StepComponent = STEPS[stepIndex];

    return (
      <div className="Intro-outer-container bg-info">
        <div
          className={`text-center bg-info Intro-vertically-fill-screen Intro-fade-in ${leaving ? 'Intro-fade-out' : ''}`}
          style={{
            userSelect: 'none',
            pointerEvents: (leaving ? 'none' : undefined),
          }}
        >
          <StepComponent
            firstTime={firstTime}
            onContinue={() => {
              if (stepIndex === STEPS.length - 2) {
                // Finish
                // > Animate out
                this.setState({
                  leaving: true,
                });
                // > Wait until animation ends then call onFinish
                setTimeout(() => {
                  onFinish();
                }, 2000);
              }
              // Next step
              this.setState({
                stepIndex: stepIndex + 1,
              });
            }}
          />
        </div>
      </div>
    );
  }
}

// List or properties and their types
Intro.propTypes = {
  // Handler to call when user is done with intro
  onFinish: PropTypes.func.isRequired,
  // True if this is the user's first time
  firstTime: PropTypes.bool.isRequired,
};

export default Intro;
