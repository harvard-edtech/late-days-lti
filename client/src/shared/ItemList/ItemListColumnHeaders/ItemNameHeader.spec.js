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
        sortType="normal"
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

  it('Checks text is highlighted when given name sort type', async () => {
    // initializes the driver with the name header button
    const driver = new Driver(
      <ItemNameHeader
        text="Assignments"
        onClick={() => {}}
        sortType="by-name"
      />
    );

    // checks button exists
    assert(driver.elementExists('#nameheader-button'), 'Item name Header button absent');

    // checks that "text-primary" classname exists
    assert(driver.elementExists('.text-primary'), 'Item name header is not highlighted when it should be');
  });

  it('Checks text is not highlighted when given normal sort type', async () => {
    // initializes the driver with the name header button
    const driver = new Driver(
      <ItemNameHeader
        text="Assignments"
        onClick={() => {}}
        sortType="normal"
      />
    );

    // checks button exists
    assert(driver.elementExists('#nameheader-button'), 'Item name Header button absent');

    // checks that "text-primary" classname does not exist
    assert(!driver.elementExists('.text-primary'), 'Item name header is highlighted when it should not be');
  });
});
