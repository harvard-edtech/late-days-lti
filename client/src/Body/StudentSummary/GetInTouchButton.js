import React, { Component } from 'react';
import PropTypes from 'prop-types';
class GetInTouchButton extends Component {
  /**
   * Render GetInTouchButton
   */
  render() {
    const {
      onClick,
    } = this.props;

    return (
      <div>
        GetInTouchButton has not been created yet
      </div>
    );
  }
}

GetInTouchButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};


export default GetInTouchButton;