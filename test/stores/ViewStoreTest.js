/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

import alt from 'components/Dispatcher';
import { ViewStore } from 'stores/functions/ViewStore';
import AltTestingUtils from 'alt-utils/lib/AltTestingUtils';

describe('ViewStore', () => {

  let storeClass;

  // Instanciate a new store for every test
  beforeEach(() => {
    storeClass = AltTestingUtils.makeStoreTestable(alt, ViewStore);
  });
});
