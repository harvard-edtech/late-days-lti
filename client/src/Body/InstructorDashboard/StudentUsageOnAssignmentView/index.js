import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ItemList from '../../../shared/ItemList';

// Import styles
import './style.css';

class StudentUsageOnAssignmentView extends Component {
  /**
   * Render StudentUsageOnAssignmentView
   */
  render() {
    const {
      items,
      valueDenominator,
    } = this.props;
    return (
      <div className="studentusageonassignmentview-container">
        <div className="studentusageonassignmentview-header font-weight-bold">
          Late Days by Assignment
        </div>
        <div className="studentusageonassignmentview-items">
          <ItemList
            items={items}
            valueDenominator={valueDenominator}
            nameHeader="Assignment"
            dueAtHeader="Due At"
            valueHeader="Average Late Days Used"
            valueSuffix="Used"
            showDueAt
            footerMessage="Click an assignment for their student breakdown"
          />
        </div>
      </div>
    );
  }
}

StudentUsageOnAssignmentView.propTypes = {
  // The array of items to display
  items: PropTypes.arrayOf(
    PropTypes.shape({
      // the name of an item
      name: PropTypes.string.isRequired,
      // item's value (number of tokens used)
      value: PropTypes.number.isRequired,
      // optional function that allows a item to be clicked for more detail
      onClick: PropTypes.func,
      // optional due date of item
      dueAt: PropTypes.instanceOf(Date),
    })
  ).isRequired,
  // The denominator to show below the value
  valueDenominator: PropTypes.number.isRequired,
};


export default StudentUsageOnAssignmentView;
