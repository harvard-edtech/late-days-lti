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

    const dueAtItem = (
      dueAt
        ? (
          <ItemDue
            dueAt={dueAt}
          />
        )
        : null
    );

    /* eslint-disable jsx-a11y/click-events-have-key-events */
    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return (
      <div className="itemrow-container">
        <div
          className="itemrow-item"
          onClick={(event) => {
            // Only fire onClick if the button wasn't clicked
            // (don't want to double-fire onClick)
            if (event.target.tagName.toLowerCase() !== 'button') {
              onClick();
            }
          }}
          style={{
            cursor: onClick ? 'pointer' : undefined,
          }}
        >
          <div className="itemrow-name">
            <ItemName
              name={name}
              onClick={onClick}
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
