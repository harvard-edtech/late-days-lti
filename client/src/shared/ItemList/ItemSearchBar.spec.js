import React from 'react';
import Driver from 'dce-enzyme';
import assert from 'assert';

import ItemSearchBar from './ItemSearchBar';

describe('client > src > Body > shared > ItemList > ItemSearchBar', () => {
  it('Allows user to type into input field and updates the search query in the store', async () => {
    // Fake query string to be updated when onSearchChanged is called
    let testQuery;

    // Initialize Driver
    const driver = new Driver(
      <ItemSearchBar
        query=""
        onQueryChange={(newQuery) => {
          testQuery = newQuery;
        }}
      />
    );

    // Simulate typing
    await driver.typeInto('.form-control', 'this is a test!');
    // Assert that prop is updated after typing
    assert.equal(testQuery, 'this is a test!');
  });
});
