import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ItemList from '../../../shared/ItemList';

import './style.css';

class LateDaysByStudentView extends Component {
  /**
   * Render LateDaysByStudentView
   */
  render() {
    const {
      items,
      valueDenominator,
      footerMessage,
      valueSuffix,
      nameHeader,
      valueHeader,
    } = this.props;
    return (
      <div className="latedaysbystudentview-container">
        <div className="latedaysbystudentview-header font-weight-bold">
          Late Days By Student
        </div>
        <ItemList
          items={items}
          valueDenominator={valueDenominator}
          nameHeader={nameHeader}
          valueHeader={valueHeader}
          valueSuffix={valueSuffix}
          footerMessage={footerMessage}
        />
      </div>
    );
  }
}

LateDaysByStudentView.propTypes = {
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
  // The header text above the item name column
  nameHeader: PropTypes.string.isRequired,
  // The header text above the item value column
  valueHeader: PropTypes.string.isRequired,
  // String to display after the value fraction
  valueSuffix: PropTypes.string.isRequired,
  // The message to display in the footer
  footerMessage: PropTypes.node.isRequired,
};

export default LateDaysByStudentView;
