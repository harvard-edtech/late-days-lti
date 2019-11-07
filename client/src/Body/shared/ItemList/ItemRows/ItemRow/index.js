import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import other components
import ItemDue from './ItemDue';
import ItemName from './ItemName';
import ItemValue from './ItemValue';

class ItemRow extends Component {
  /**
   * Render ItemRow
   */
  render() {
    const {
      item,
      valueDenominator,
      valueSuffix,
    } = this.props;

    const {
      name,
      value,
      onClick,
      dueAt,
    } = item;

    let dueAtItem;
    let toRender;

    if (dueAt) {
      dueAtItem = (
        <ItemDue
          dueAt={dueAt}
        />
      );
    }

    toRender = (
      <div className="itemrow-item">
        <div className="itemrow-name">
          <ItemName
            name={name}
          />
        </div>
        <div className="itemrow-dueAt">
          {dueAtItem}
        </div>
        <div className="itemrow-value">
          <ItemValue
            value={value}
            valueDenominator={valueDenominator}
            valueSuffix={valueSuffix}
          />
        </div>
      </div>
    );

    if (onClick) {
      toRender = (
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={onClick}
        >
          {toRender}
        </button>
      );
    }
    return (
      <div className="itemrow-container">
        { toRender }
      </div>
    );
  }
}

ItemRow.propTypes = {
  // The array of items to display
  item:
    PropTypes.shape({
      // the name of an item
      name: PropTypes.string.isRequired,
      // item's value (number of tokens used)
      value: PropTypes.number.isRequired,
      // optional function that allows a item to be clicked for more detail
      onClick: PropTypes.func,
      // optional due date of item
      dueAt: PropTypes.instanceOf(Date),
    }).isRequired,
  // The denominator to show below the value
  valueDenominator: PropTypes.number.isRequired,
  // String to display after the value fraction
  valueSuffix: PropTypes.string.isRequired,
};

export default ItemRow;
