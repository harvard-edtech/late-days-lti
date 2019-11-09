import React from 'react';
import Driver from 'dce-enzyme';
import assert from 'assert';

import ItemDue from './ItemDue';

describe.only('client > src > Body > shared > ItemList > ItemRows > ItemRow > ItemDue', () => {
  it('Checks Date object parsed correctly', async () => {
    // Creates a date object to test with
    const testDate = new Date('November 6 2019 05:35:32');

    // Initializes driver with ItemDue object
    const driver = new Driver(
      <ItemDue
        dueAt={testDate}
      />
    );

    // Assert itemDue object was created
    assert(driver.elementExists('.itemdue-container'), 'ItemDue object does not exist');

    // Checks that date and time are correct
    assert.equal(
      driver.getText('.itemdue-date'),
      '11/6/2019',
      'date text was incorrect'
    );
    assert.equal(
      driver.getText('.itemdue-time'),
      '5:35:32 AM',
      'time text was incorrect'
    );
  });
});
