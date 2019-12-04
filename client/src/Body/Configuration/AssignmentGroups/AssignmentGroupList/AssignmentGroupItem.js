import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AssignmentGroupItem extends Component {
  /**
   * Render AssignmentGroupItem
   */
  render() {
    const {
      name,
    } = this.props;

    return (
      <div className="assignmentgroupitem-container">
        <div className="form-check">
          <label className="form-check-label" htmlFor="exampleCheck1">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
            {name}
          </label>
        </div>
      </div>
    );
  }
}

AssignmentGroupItem.propTypes = {
  name: PropTypes.string.isRequired,
};

export default AssignmentGroupItem;
