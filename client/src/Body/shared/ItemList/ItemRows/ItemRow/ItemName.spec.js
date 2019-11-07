import React from 'react';
import Driver from 'dce-enzyme';
import assert from 'assert';

import ItemName from './ItemName';

describe('client > src > Body > shared > ItemList > ItemRows > ItemRow > ItemName', () => {
  it('Checks ItemName object exists with correct name', async () => {
    // Initializes driver with ItemName object
    const driver = new Driver(
      <ItemName
        name="Assignment 1"
      />
    );

    // Assert itemName object was created
    assert(driver.elementExists('.itemname-container'), 'ItemName object does not exist');

    // Checks that name are correct
    assert.equal(
      driver.getText('.itemname-container'),
      'Assignment 1',
      'name text was incorrect'
    );
  });
});
