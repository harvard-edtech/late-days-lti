import React from 'react';
import Driver from 'dce-enzyme';
import assert from 'assert';

import ItemFooter from './ItemFooter';

describe('client > src > Body > shared > ItemList > ItemFooter', () => {
  it('Checks ItemFooter object exists', async () => {
    // Initializes driver with ItemFooter object
    const driver = new Driver(
      <ItemFooter
        footerMessage="This is a footer"
      />
    );

    // Assert ItemFooter object was created
    assert(driver.elementExists('.itemfooter-container'), 'ItemFooter object does not exist');

    // Checks that message is correct
    assert.equal(
      driver.getText('.itemfooter-container'),
      'This is a footer',
      'footer text was incorrect'
    );
  });
});
