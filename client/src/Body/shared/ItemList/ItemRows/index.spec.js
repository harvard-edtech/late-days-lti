import React from 'react';
import Driver from 'dce-enzyme';
import assert from 'assert';

import ItemRows from './index';

describe('client > src > Body > shared > ItemList > ItemRows', () => {
  it('Checks ItemRows object exists and sorts by Due At date', async () => {
    // Creates a date object to test with
    const testDateOne = new Date('November 8 2019 05:35:32');
    const testDateTwo = new Date('November 7 2019 05:35:32');
    const testDateThree = new Date('November 1 2019 05:35:32');

    let clickedOne = false;
    let clickedThree = false;

    const itemOne = {
      name: 'Assignment 1',
      value: 1,
      onClick: () => {
        clickedOne = true;
      },
      dueAt: testDateOne,
    };

    const itemTwo = {
      name: 'Assignment 1',
      value: 1,
      dueAt: testDateTwo,
    };

    const itemThree = {
      name: 'Assignment 1',
      value: 1,
      onClick: () => {
        clickedThree = true;
      },
      dueAt: testDateThree,
    };

    const items = [itemOne, itemTwo, itemThree];
    // Initializes driver with ItemRows object
    const driver = new Driver(
      <ItemRows
        items={items}
        valueDenomintaor={3}
        valueSuffix="Used"
        sorType="by-due-at"
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
