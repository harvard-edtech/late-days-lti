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
        sortType="normal"
      />
    );

    // checks button exists
    assert(driver.elementExists('#valueheader-button'), 'Item Value Header button absent');
    // checks that button says "Tokens Used"
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

  it('Checks text is highlighted when given value sort type', async () => {
    // initializes the driver with the value header button
    const driver = new Driver(
      <ItemValueHeader
        text="Assignments"
        onClick={() => {}}
        sortType="by-value"
      />
    );

    // checks button exists
    assert(driver.elementExists('#valueheader-button'), 'Item value Header button absent');

    // checks that "text-primary" classname exists
    assert(driver.elementExists('.text-primary'), 'Item value header is not highlighted when it should be');
  });

  it('Checks text is not highlighted when given normal sort type', async () => {
    // initializes the driver with the value header button
    const driver = new Driver(
      <ItemValueHeader
        text="Assignments"
        onClick={() => {}}
        sortType="normal"
      />
    );

    // checks button exists
    assert(driver.elementExists('#valueheader-button'), 'Item value Header button absent');

    // checks that "text-primary" classname does not exist
    assert(!driver.elementExists('.text-primary'), 'Item value header is highlighted when it should not be');
  });
});
