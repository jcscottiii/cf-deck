
/*
 * Actions for app entities. Any actions such as fetching, creating, updating,
 * etc should go here.
 *
 * @flow
 */

import AppDispatcher from '../dispatcher.js';
import { appActionTypes } from '../constants';

import type {App} from '../models/app.js';

export default {
  fetch(appGuid: string) {
    AppDispatcher.handleViewAction({
      type: appActionTypes.APP_FETCH,
      appGuid: appGuid
    });
  },

  receivedApp(app: App) {
    AppDispatcher.handleServerAction({
      type: appActionTypes.APP_RECEIVED,
      app: app
    });
  }
};
