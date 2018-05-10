import { AsyncStorage, NetInfo } from 'react-native';
import * as actions from './actions';
import Api, { SocketApi } from '../../api';

export const initApi = token => () => {
  Api.setToken(token);
  SocketApi.initialize(token);

  // initialize socket handlers
  SocketApi.setOnMessageHandler(data => console.log(data));
};

export const initialization = () => async (dispatch) => {
  NetInfo.isConnected.addEventListener('connectionChange', isConnected => console.log(isConnected));

  try {
    const token = await AsyncStorage.getItem('token');

    if (token) {
      dispatch(initApi(token));
    }
  } catch (err) {
    console.log(err);
  }
};

export const increment = payload => actions.increment(payload);
export const decrement = payload => actions.decrement(payload);
