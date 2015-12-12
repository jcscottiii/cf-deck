/*
 * Store for app data. Will store and update app data on changes from UI and
 * server.
 * 
 * @flow
 */

import AppDispatcher from '../dispatcher';
import BaseStore from './base_store.js';
import cfApi from '../util/cf_api.js';
import LoginStore from './login_store.js';
import { appActionTypes } from '../constants.js';

import type {App} from '../models/app.js';

class AppStore extends BaseStore {
  _data: Array<App>;

  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this));
    this._data = [];
  }

  _registerToActions(action: any) {
    switch(action.type) {
      case appActionTypes.APP_FETCH:
        cfApi.fetchApp(action.appGuid);
        break;

      case appActionTypes.APP_RECEIVED:
        // TODO only emit change event if updates actually change local data.
        this._data = this._merge(this._data, [action.app]);
        this.emitChange();
        break;

      default:
        break;
    }
  }
}

let _AppStore = new AppStore();

export default _AppStore;
