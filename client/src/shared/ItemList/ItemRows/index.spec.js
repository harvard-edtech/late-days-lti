import React from 'react';
import Driver from 'dce-enzyme';
import assert from 'assert';

import ItemRows from './index';

describe('client > src > Body > shared > ItemList > ItemRows', () => {
  it('Checks ItemRows object exists with correct number of items', async () => {
    const itemOne = {
      name: 'Assignment 1',
      value: 1,
    };

    const itemTwo = {
      name: 'Assignment 2',
      value: 1,
    };

    const itemThree = {
      name: 'Assignment 3',
      value: 1,
    };

    const items = [itemOne, itemTwo, itemThree];
    // Initializes driver with ItemRows object
    const driver = new Driver(
      <ItemRows
        items={items}
        valueDenominator={3}
        valueSuffix="Used"
        sortType="by-due-at"
      />
    );

    // Assert ItemRows object was created
    assert(driver.elementExists('.itemrows-container'), 'ItemRows object does not exist');

    // displays three items
    const itemRowsHTML = driver.getHTML('.itemrows-container');
    const itemCount = (itemRowsHTML.match(/itemrow-container/g) || []).length;
    assert.equal(itemCount, 3, 'did not display the correct number of items');
  });
});
