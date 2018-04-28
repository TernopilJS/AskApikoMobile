import { AsyncStorage, NetInfo } from 'react-native';
import R from 'ramda';
import { delay } from '../../utils';
import * as actions from './actions';
import * as navigationOperations from '../navigation/operations';
import { viewerOperations } from '../viewer';
import { chatsOperations } from '../chats';
import { notificationsOperations } from '../notifications';
import Api, { SocketApi } from '../../api';

export const initApi = token => (dispatch) => {
  Api.setToken(token);
  SocketApi.initialize(token);

  // initialize socket handlers
  SocketApi.setOnMessageHandler(data =>
    dispatch(chatsOperations.appendMessageRealtime(data)));
};

export const navigateToAppByRole = role => dispatch => (role
  ? dispatch(navigationOperations.navigateToAdminApp())
  : dispatch(navigationOperations.navigateToApp())
);

export const navigateToApp = () => async (dispatch, getState) => {
  const contactsSyncedTime =
    R.path(['viewer', 'viewer', 'contactsSyncedTime'], getState());
  const role =
    R.path(['viewer', 'viewer', 'role'], getState());

  if (typeof contactsSyncedTime === 'undefined' || contactsSyncedTime === null) {
    dispatch(navigationOperations.navigateToSync());
  } else {
    dispatch(navigateToAppByRole(role));
    await delay(500);
    dispatch(viewerOperations.setNotificationToken());
  }
};

export const getAppFeatures = () => async (dispatch) => {
  try {
    dispatch(actions.getAppFeaturesStart());

    const features = await Api.getFeatures();
    dispatch(actions.getAppFeaturesSuccess(features.data));
  } catch (err) {
    dispatch(actions.getAppFeaturesError({ message: err.message }));
  }
};

export const testInvitationCode = code => async (dispatch) => {
  try {
    dispatch(actions.testInvitationCodeStart(code));

    const response = await Api.testInvitationCode(code);

    dispatch(actions.testInvitationCodeSuccess(response.data));

    return R.pathOr(false, ['data', 'inviteCodeValid'], response);
  } catch (err) {
    dispatch(actions.testInvitationCodeError({ message: err.message }));
    return false;
  }
};

export const initMainApp = data => async (dispatch) => {
  dispatch(viewerOperations.setViewer(data));
  dispatch(navigateToApp());
  dispatch(notificationsOperations.getNotificationCounts());
};

export const initialization = () => async (dispatch) => {
  // 310-801-5505
  // UserId:         b1fa4643-02b9-40f6-976e-b7affa046c67
  // role: reviewer
  // await AsyncStorage.setItem('token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiJiMWZhNDY0My0wMmI5LTQwZjYtOTc2ZS1iN2FmZmEwNDZjNjciLCJpYXQiOjE1MTQ2ODg3MjMxNTV9.0MLXYfYy-pFyCVRZCacI_IYtHDDJxxiEUUlUq86hzu0');

  // 310-880-9455
  // UserId: bbc1ce47-21c2-42a5-a8b2-c4f665fb909f
  // role: admin

  // await AsyncStorage.setItem('token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiJiYmMxY2U0Ny0yMWMyLTQyYTUtYThiMi1jNGY2NjVmYjkwOWYiLCJpYXQiOjE1MTkyOTAyMzI2ODB9.OR7L7_FUIpBRyomHas4gDJcKTJuK4ZiTI7KxP4ej6-w');

  NetInfo.isConnected.addEventListener('connectionChange', isConnected =>
    dispatch(actions.changeNetworkState(isConnected)));

  try {
    await dispatch(getAppFeatures());

    const token = await AsyncStorage.getItem('token');
    if (token) {
      dispatch(initApi(token));

      const response = await Api.getAccountDetails();

      if (response.status === 200) {
        await dispatch(initMainApp(response.data));
      }
    }
  } catch (err) {
    dispatch(navigationOperations.navigateToWelcome());
  }
};
