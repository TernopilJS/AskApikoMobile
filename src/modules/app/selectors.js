import { createSelector } from 'reselect';
import R from 'ramda';

export const getCounter = createSelector(
  R.pathOr(0, ['app', 'counter']),
  counter => counter,
);
