import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ItemName extends Component {
  /**
   * Render ItemName
   */
  render() {
    const { name } = this.props;
    return (
      <div className="itemname-container">
        {name}
      </div>
    );
  }
}

ItemName.propTypes = {
  // Name of assignment or person
  name: PropTypes.string.isRequired,
};


export default ItemName;
