import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BackButton extends Component {

  const {
    onClick,
  } = this.props;
  /**
   * Render Backbutton
   */
  render() {
    return (
      <div>
        Backbutton has not been created yet
      </div>
    );
}


BackButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

BackButton.defaultProps = {};

export default BackButton;
