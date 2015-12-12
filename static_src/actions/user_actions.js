/*
 * Actions for user entities. Any actions such as fetching, creating, updating,
 * etc should go here.
 *
 * @flow
 */

import AppDispatcher from '../dispatcher.js';
import { userActionTypes } from '../constants';

import type {HttpError} from '../models/errors.js';
import type {User} from '../models/user.js';


export default {
  fetchOrgUsers(orgGuid: string): void {
    AppDispatcher.handleViewAction({
      type: userActionTypes.ORG_USERS_FETCH,
      orgGuid: orgGuid
    });
  },

  fetchSpaceUsers(spaceGuid: string) {
    AppDispatcher.handleViewAction({
      type: userActionTypes.SPACE_USERS_FETCH,
      spaceGuid: spaceGuid
    });
  },

  receivedOrgUsers(users: Array<User>, orgGuid: string) {
    AppDispatcher.handleServerAction({
      type: userActionTypes.ORG_USERS_RECEIVED,
      users: users,
      orgGuid: orgGuid
    });
  },

  receivedSpaceUsers(users: Array<User>, spaceGuid: string) {
    AppDispatcher.handleServerAction({
      type: userActionTypes.SPACE_USERS_RECEIVED,
      users: users,
      spaceGuid: spaceGuid
    });
  },

  deleteUser(userGuid: string, orgGuid: string) {
    AppDispatcher.handleViewAction({
      type: userActionTypes.USER_DELETE,
      userGuid: userGuid,
      orgGuid: orgGuid
    });
  },

  deletedUser(userGuid: string, orgGuid: string) {
    AppDispatcher.handleServerAction({
      type: userActionTypes.USER_DELETED,
      userGuid: userGuid,
      orgGuid: orgGuid
    });
  },

  errorRemoveUser(userGuid: string, error: HttpError) {
    AppDispatcher.handleServerAction({
      type: userActionTypes.ERROR_REMOVE_USER,
      userGuid: userGuid,
      error: error
    });
  }

};
