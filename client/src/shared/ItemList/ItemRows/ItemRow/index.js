import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import other components
import ItemDue from './ItemDue';
import ItemName from './ItemName';
import ItemValue from './ItemValue';

import '../../style.css';
import './style.css';

class ItemRow extends Component {
  /**
   * Render ItemRow
   */
  render() {
    const {
      item,
      valueDenominator,
      valueSuffix,
      showDueAt,
    } = this.props;

    const {
      name,
      value,
      onClick,
      dueAt,
    } = item;

    // Checks if the item used too many tokens
    const dueOver = (value > valueDenominator);

    // Checks whether to display the dueAt column
    const dueAtItem = (
      showDueAt
        ? (
          <div className={`itemrow-dueAt itemlist-due-column ${dueOver ? 'itemrow-overdueat bg-crimson' : ''}`}>
            <ItemDue
              dueAt={dueAt}
            />
          </div>
        )
        : null
    );

    /* eslint-disable jsx-a11y/click-events-have-key-events */
    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return (
      <div className="itemrow-container">
        <div
          className="itemrow-item d-flex mt-3 mb-3"
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
          <div className={`itemrow-name itemlist-name-column flex-grow-1 ${dueOver ? 'itemrow-overname bg-crimson' : ''}`}>
            <ItemName
              name={name}
              onClick={onClick}
            />
          </div>
          {dueAtItem}
          <div className={`itemrow-value itemlist-value-column ${dueOver ? 'itemrow-overvalue' : ''}`}>
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
  // If true, the dueAt column is shown
  showDueAt: PropTypes.bool,
};

ItemRow.defaultProps = {
  showDueAt: false,
};

export default ItemRow;
