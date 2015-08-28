
import AppDispatcher from '../dispatcher.js';
import cfApi from '../utils/cf_api.js';
import { spaceActionTypes } from '../constants';

export default {
  fetch(spaceGuid) {
    AppDispatcher.handleViewAction({
      type: spaceActionTypes.SPACE_FETCH,
      spaceGuid: spaceGuid
    });

    cfApi.fetchSpace(spaceGuid);
  },

  receivedSpace(space) {
    AppDispatcher.handleServerAction({
      type: spaceActionTypes.SPACE_RECEIVED,
      space: space
    });
  }
};
