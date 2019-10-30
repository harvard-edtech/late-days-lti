import React, { Component } from 'react';
import PropTypes from 'prop-types';
class ConfigButton extends Component {
  /**
   * Render ConfigButton
   */
  render() {
    const {
      onClick,
    } = this.props;

    return (
      <div>
        ConfigButton has not been created yet
      </div>
    );
  }
}

ConfigButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};


export default ConfigButton;