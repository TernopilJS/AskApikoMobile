import { createSelector } from 'reselect';
import R from 'ramda';

export const getAppFeatures = createSelector(
  R.pathOr({}, ['app', 'features']),
  features => features,
);
