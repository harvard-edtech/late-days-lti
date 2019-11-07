import React from 'react';
import Driver from 'dce-enzyme';
import assert from 'assert';

import ItemNameHeader from './ItemNameHeader';

describe('client > src > shared > ItemList > ItemListColumnHeaders > ItemNameHeader', () => {
  it('Handles a click', async () => {
    // keep track of button clicks
    let clicked = false;

    // initializes the driver with the name header button
    const driver = new Driver(
      <ItemNameHeader
        text="Assignments"
        onClick={() => {
          clicked = true;
        }}
      />
    );

    // checks button exists
    assert(driver.elementExists('#nameheader-button'), 'Item name Header button absent');
    // checks that button says "Assignments"
    assert.equal(
      driver.getText('#nameheader-button'),
      'Assignments',
      'Text on Due button does not match expected'
    );
    // simulate a click
    driver.click('#nameheader-button');
    // makes sure button is clicked
    assert(clicked, 'Button did not handle the click');
  });
});