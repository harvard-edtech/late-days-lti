import React from 'react';
import Driver from 'dce-enzyme';
import assert from 'assert';

import ItemRow from './index';

describe('client > src > Body > shared > ItemList > ItemRows > ItemRow', () => {
  it('Checks ItemName object exists with due at column when showDueAt is true', async () => {
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
        showDueAt
      />
    );

    // Assert ItemRow object was created
    assert(driver.elementExists('.itemrow-container'), 'ItemRow object does not exist');

    // Checks that name, due at, and value item exists
    assert(driver.elementExists('.itemrow-name'), 'Name object does not exist');
    assert(driver.elementExists('.itemrow-dueAt'), 'DueAt object does not exist');
    assert(driver.elementExists('.itemrow-value'), ' object does not exist');
  });

  it('Checks ItemName object exists without due at column when showDueAt is false', async () => {
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

    // Assert ItemRow object was created
    assert(driver.elementExists('.itemrow-container'), 'ItemRow object does not exist');

    // Checks that name and value item exists, dueAt item doesn't exist
    assert(driver.elementExists('.itemrow-name'), 'Name object does not exist');
    assert(!driver.elementExists('.itemrow-dueAt'), 'DueAt object does not exist');
    assert(driver.elementExists('.itemrow-value'), ' object does not exist');
  });

  it('Checks item changes colors if used too many tokens', async () => {
    // Creates a date object to test with
    const testDate = new Date('November 6 2019 05:35:32');

    const item = {
      name: 'Assignment 1',
      value: 5,
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

    // Assert ItemRow object was created
    assert(driver.elementExists('.itemrow-container'), 'ItemRow object does not exist');

    // Checks that name and value have different colored styling
    assert(driver.elementExists('.itemrow-overname'), 'Name element is not colored red when it should be');
    assert(driver.elementExists('.itemrow-overvalue'), 'Value element is not colored red when it should be');
  });
});
