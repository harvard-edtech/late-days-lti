import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ItemDue extends Component {
  /**
   * Render ItemDue
   */
  render() {
    return (
      <div>
        ItemDue has not been created yet
      </div>
    );
  }
}


ItemDue.propTypes = {
  // TODO: add description
  dueAt: PropTypes.instanceOf(Date),
};


export default ItemDue;
