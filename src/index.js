import React from 'react';
import T from 'prop-types';
import { AppLoading } from 'expo';
import { BackHandler, View, Platform, UIManager } from 'react-native';
import { Provider } from 'react-redux';
import {
  compose,
  withState,
  withHandlers,
  lifecycle,
} from 'recompose';
import store from './store';
import { globalStyles } from './styles';
import { appOperations } from './modules/app';
import { loadAssets, loadFonts } from './utils';
import RootNavigator from './navigation/RootNavigator';

const isAndroid = Platform.OS === 'android';

if (isAndroid) {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const App = ({
  showLoading,
  setLoadingStatus,
  asyncJob,
}) => {
  if (showLoading) {
    return (
      <AppLoading
        startAsync={asyncJob}
        onFinish={() => setLoadingStatus(false)}
        onError={console.warn} // eslint-disable-line
      />
    );
  }

  return (
    <Provider store={store}>
      <View style={globalStyles.fillAll}>
        <RootNavigator />
      </View>
    </Provider>
  );
};

App.propTypes = {
  showLoading: T.bool,
  setLoadingStatus: T.func,
  asyncJob: T.func,
};


const enhance = compose(
  withState('showLoading', 'setLoadingStatus', true),
  withHandlers({
    asyncJob: () => async () => {
      await Promise.all([
        loadAssets(),
        loadFonts(),
        store.dispatch(appOperations.initialization()),
      ]);
    },
    navigateBack: props => () => { // eslint-disable-line
      return true;
    },
  }),
  lifecycle({
    componentDidMount() {
      BackHandler.addEventListener('hardwareBackPress', this.props.navigateBack);
    },
  }),
);

export default enhance(App);
