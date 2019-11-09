import React from 'react';
import Driver from 'dce-enzyme';
import assert from 'assert';

import ItemValue from './ItemValue';

describe('client > src > Body > shared > ItemList > ItemRows > ItemRow > ItemValue', () => {
  it('Checks ItemValue object exists and in correct format', async () => {
    // Initializes driver with ItemValue object
    const driver = new Driver(
      <ItemValue
        value={1}
        valueDenominator={2}
        valueSuffix="Used"
      />
    );

    // Assert itemValue object was created
    assert(driver.elementExists('.itemvalue-container'), 'ItemName object does not exist');

    // Checks that info formatted correctly
    assert.equal(
      driver.getText('.itemvalue-container'),
      '1/2 Used',
      'value text was incorrect'
    );
  });

  it('Checks ItemValue object correctly displays given empty suffix', async () => {
    // Initializes driver with ItemValue object
    const driver = new Driver(
      <ItemValue
        value={1}
        valueDenominator={2}
        valueSuffix=""
      />
    );

    // Assert itemValue object was created
    assert(driver.elementExists('.itemvalue-container'), 'ItemName object does not exist');

    // Checks that info formatted correctly
    assert.equal(
      driver.getText('.itemvalue-container'),
      '1/2',
      'value text was incorrect'
    );
  });
});
