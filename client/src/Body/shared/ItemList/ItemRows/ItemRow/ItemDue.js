import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../../style.css';

class ItemDue extends Component {
  /**
   * Render ItemDue
   */
  render() {
    const { dueAt } = this.props;
    const date = dueAt.toLocaleDateString();
    const time = dueAt.toLocaleTimeString();

    return (
      <div className="itemdue-container font-weight-bold">
        <div className="itemdue-date">
          {date}
        </div>
        <div className="itemdue-time">
          {time}
        </div>
      </div>
    );
  }
}


ItemDue.propTypes = {
  // Date a certain assignment is due
  dueAt: PropTypes.instanceOf(Date).isRequired,
};


export default ItemDue;
