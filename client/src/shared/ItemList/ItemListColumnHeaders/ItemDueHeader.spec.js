import React from 'react';
import Driver from 'dce-enzyme';
import assert from 'assert';

import ItemDueHeader from './ItemDueHeader';

describe('client > src > shared > ItemList > ItemListColumnHeaders > ItemDueHeader', () => {
  it('Handles a click', async () => {
    // keep track of button clicks
    let clicked = false;

    // initializes the driver with the due header button
    const driver = new Driver(
      <ItemDueHeader
        text="Due At"
        sortType="natural"
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

  it('Checks text is highlighted when given due at sort type', async () => {
    // initializes the driver with sort type as "by-due-at"
    const driver = new Driver(
      <ItemDueHeader
        text="Due At"
        sortType="by-due-at"
        onClick={() => {}}
      />
    );

    // checks header exists
    assert(driver.elementExists('#dueheader-button'), 'Item Due Header button absent');

    // checks that "text-primary" classname exists
    assert(driver.elementExists('.text-primary'), 'Item due header is not highlighted when it should be');
  });

  it('Checks text is not highlighted when given normal sort type', async () => {
    // initializes the driver with sort type as "normal"
    const driver = new Driver(
      <ItemDueHeader
        text="Due At"
        sortType="normal"
        onClick={() => {}}
      />
    );

    // checks header exists
    assert(driver.elementExists('#dueheader-button'), 'Item Due Header button absent');

    // checks that "text-primary" classname does not exist
    assert(!driver.elementExists('.text-primary'), 'Item due header is highlighted when it should not be');
  });
});
