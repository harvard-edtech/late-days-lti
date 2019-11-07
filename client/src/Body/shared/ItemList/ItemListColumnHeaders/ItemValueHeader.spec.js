import React from 'react';
import Driver from 'dce-enzyme';
import assert from 'assert';

import ItemValueHeader from './ItemValueHeader';

describe('client > src > shared > ItemList > ItemListColumnHeaders > ItemValueHeader', () => {
  it('Handles a click', async () => {
    // keep track of button clicks
    let clicked = false;

    // initializes the driver with the due header button
    const driver = new Driver(
      <ItemValueHeader
        text="Due At"
        onClick={() => {
          clicked = true;
        }}
      />
    );

    // checks button exists
    assert(driver.elementExists('#dueheader-button'), 'Item Due Header button absent');
    // checks that button says "Due At"
    assert.equal(
      driver.getText('#dueheader-button'),
      'Due At',
      'Text on Due button does not match expected'
    );
    // simulate a click
    driver.click('#dueheader-button');
    // makes sure button is clicked
    assert(clicked, 'Button did not handle the click');
  });
});