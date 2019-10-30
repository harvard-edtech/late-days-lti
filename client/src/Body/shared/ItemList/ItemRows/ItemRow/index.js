import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ItemDue from './ItemDue';
import ItemName from './ItemName';
import ItemValue from './ItemValue';
class ItemRow extends Component {
    /**
     * Render ItemRow
     */
    render() {
      
      return (
        <div>
          ItemRow has not been created yet
        </div>
      );
  }
}

  ItemRow.propTypes = {
    onClick: PropTypes.func,
  };

  ItemRow.defaultProps = {
    onClick: null,
  };

}
export default ItemRow;