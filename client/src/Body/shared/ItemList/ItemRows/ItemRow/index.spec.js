import React from 'react';
import Driver from 'dce-enzyme';
import assert from 'assert';

import ItemRow from './index';

describe('client > src > Body > shared > ItemList > ItemRows > ItemRow', () => {
  it('Checks ItemName object exists with a button given an onClick function', async () => {
    // Creates a date object to test with
    const testDate = new Date('November 6 2019 05:35:32');

    // keep track of button clicks
    let clicked = false;

    const item = {
      name: 'Assignment 1',
      value: 1,
      onClick: () => {
        clicked = true;
      },
      dueAt: testDate,
    };

    // Initializes driver with ItemRow object
    const driver = new Driver(
      <ItemRow
        item={item}
        valueDenominator={3}
        valueSuffix="Used"
      />
    );

    // Assert ItemRow object was created and button exists
    assert(driver.elementExists('.itemrow-container'), 'ItemRow object does not exist');
    assert(driver.elementExists('#itemrow-button'), 'ItemRow button does not exist');

    // simulate a click
    driver.click('#itemrow-button');
    // makes sure button is clicked
    assert(clicked, 'Button did not handle the click');

    // Checks that name, due at, and value item exists
    assert(driver.elementExists('.itemrow-name'), 'Name object does not exist');
    assert(driver.elementExists('.itemrow-dueAt'), 'DueAt object does not exist');
    assert(driver.elementExists('.itemrow-value'), ' object does not exist');
  });

  it('Checks ItemName object exists without a button when onClick function does not exist', async () => {
    // Creates a date object to test with
    const testDate = new Date('November 6 2019 05:35:32');

    const item = {
      name: 'Assignment 1',
      value: 1,
      dueAt: testDate,
    };

    // Initializes driver with ItemRow object
    const driver = new Driver(
      <ItemRow
        item={item}
        valueDenominator={3}
        valueSuffix="Used"
      />
    );

    // Assert ItemRow object was created and button exists
    assert(driver.elementExists('.itemrow-container'), 'ItemRow object does not exist');
    assert(!driver.elementExists('#itemrow-button'), 'ItemRow button exists when it should not');

    // Checks that name, due at, and value item exists
    assert(driver.elementExists('.itemrow-name'), 'Name object does not exist');
    assert(driver.elementExists('.itemrow-dueAt'), 'DueAt object does not exist');
    assert(driver.elementExists('.itemrow-value'), ' object does not exist');
  });
});
