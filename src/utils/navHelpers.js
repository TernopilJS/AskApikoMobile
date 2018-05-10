import R from 'ramda';

import { NavigationActions as Actions } from 'react-navigation';

const action = (routeName, params) => Actions.navigate({ routeName, params });

export const getResetAction = (screens, lastScreenParams, key) => {
  const s = R.is(Array, screens) ? screens : [screens];

  return Actions.reset({
    index: s.length - 1,
    actions: [
      ...R.map(action, R.init(s)),
      action(R.last(s), lastScreenParams),
    ],
    key,
  });
};

export const getCurrentRoute = (state) => {
  const findCurrentRoute = (navState) => {
    if (navState.index !== undefined) {
      return findCurrentRoute(navState.routes[navState.index]);
    }
    return navState.routeName;
  };
  return findCurrentRoute(state);
};

export const getParams = (nav, ...paramNames) =>
  paramNames
    .reduce((acc, paramName) => {
      acc[paramName] = nav.state.params[paramName];
      return acc;
    }, {});

export const getParamsOr = (nav, obj) =>
  Object.keys(obj)
    .reduce((acc, paramName) => {
      const param = R.path(['state', 'params', paramName], nav);
      if (param) {
        acc[paramName] = param;
      }
      return acc;
    }, obj);

export const isRootScreen = (nav) => {
  if (nav.index == null) {
    return true;
  }

  if (nav.index > 0) {
    return false;
  }

  return !nav.routes || !nav.routes.find(route => !isRootScreen(route));
};

export const getParam = (nav, paramName) => R.path(['state', 'params', paramName], nav);
export const getParamOr = (nav, paramName, or) => R.pathOr(or, ['state', 'params', paramName], nav);
