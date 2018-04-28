import { handleActions } from 'redux-actions';
import * as types from './types';

import { mergeIn } from '../../utils/stateHelpers';

const INITIAL_STATE = {
  isOnline: true,
  showInvitationCodeError: false,
};

export default handleActions({
  [types.CHANGE_NETWORK_STATE]: mergeIn(action => ({
    isOnline: action.payload,
  })),
  [types.GET_APP_FEATURES_SUCCESS]: mergeIn(action => ({
    features: action.payload.features,
  })),
}, INITIAL_STATE);
