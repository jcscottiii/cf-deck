/*
 * Store for user data. Will store and update user data on changes from UI and
 * server.
 *
 * @flow
 */

import AppDispatcher from '../dispatcher';
import BaseStore from './base_store.js';
import cfApi from '../util/cf_api.js';
import { userActionTypes } from '../constants.js';

import type {HttpError} from '../models/errors.js';
import type {User} from '../models/user.js';

class UserStore extends BaseStore {
  _data: Array<User>;
  _error: ?HttpError;

  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this));
    this._data = [];
    this._error = null;
  }

  _registerToActions(action: any) {
    switch(action.type) {
      case userActionTypes.ORG_USERS_FETCH:
        cfApi.fetchOrgUsers(action.orgGuid);
        break;

      case userActionTypes.SPACE_USERS_FETCH:
        cfApi.fetchSpaceUsers(action.spaceGuid);
        break;

      case userActionTypes.SPACE_USERS_RECEIVED:
      case userActionTypes.ORG_USERS_RECEIVED:
        var updates = this.formatSplitResponse(action.users);
        updates = updates.map((update) => {
          if (action.orgGuid) {
            update.orgGuid = action.orgGuid;
          }
          if (action.spaceGuid) {
            update.spaceGuid = action.spaceGuid;
          }
          return update;
        });
        if (updates.length) {
          this._data = this._merge(this._data, updates);
          this._error = null;
          this.emitChange();
        }
        break;

      case userActionTypes.USER_DELETE:
        var orgPermissionsReq = cfApi.deleteOrgUserPermissions(
          action.userGuid,
          action.orgGuid,
          'users');

        orgPermissionsReq.then((res) => {
          cfApi.deleteUser(action.userGuid, action.orgGuid);
        });

        break;

      case userActionTypes.USER_DELETED:
        var deleted = this.get(action.userGuid);
        if (deleted) {
          var index = this._data.indexOf(deleted);
          this._data.splice(index, 1);
          this._error = null;
          this.emitChange();
        }
        break;

      case userActionTypes.ERROR_REMOVE_USER:
        this._error = action.error;
        this.emitChange();
        break;

      default:
        break;
    }
  }

  /**
   * Get all users in a certain space
   */
  getAllInSpace(spaceGuid: string): Array<User> {
    return this._data.filter((user) => {
      return user.spaceGuid === spaceGuid;
    });
  }

  getAllInOrg(orgGuid: string): Array<User> {
    return this._data.filter((user) => {
      return user.orgGuid === orgGuid;
    });
  }

  getError(): ?HttpError {
    return this._error;
  }

};

let _UserStore = new UserStore();

export default _UserStore;
