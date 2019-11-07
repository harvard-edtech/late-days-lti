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
        text="Tokens Used"
        onClick={() => {
          clicked = true;
        }}
      />
    );

    // checks button exists
    assert(driver.elementExists('#valueheader-button'), 'Item Value Header button absent');
    // checks that button says "Toekns Used"
    assert.equal(
      driver.getText('#valueheader-button'),
      'Tokens Used',
      'Text on value button does not match expected'
    );
    // simulate a click
    driver.click('#valueheader-button');
    // makes sure button is clicked
    assert(clicked, 'Button did not handle the click');
  });
});