import { AsyncStorage, NetInfo } from 'react-native';
import { navigationOperations } from '../navigation';
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
      dispatch(navigationOperations.navigateToAuthorized());
    }
  } catch (err) {
    console.log(err);
  }
};
