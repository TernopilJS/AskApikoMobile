import { createAction } from 'redux-actions';
import * as types from './types';

export const initialized = createAction(types.INITIALIZED);
export const resetState = createAction(types.RESET_STATE);
export const changeNetworkState = createAction(types.CHANGE_NETWORK_STATE);

export const getAppFeaturesStart = createAction(types.GET_APP_FEATURES_START);
export const getAppFeaturesSuccess = createAction(types.GET_APP_FEATURES_SUCCESS);
export const getAppFeaturesError = createAction(types.GET_APP_FEATURES_ERROR);

export const testInvitationCodeStart = createAction(types.TEST_INVITATION_CODE_START);
export const testInvitationCodeSuccess = createAction(types.TEST_INVITATION_CODE_SUCCESS);
export const testInvitationCodeError = createAction(types.TEST_INVITATION_CODE_ERROR);
