import R from 'ramda';
import deepMerge from 'deepmerge';

const processChange = (change, state, action) => (
  typeof change === 'object' ? change : change(action, state)
);

export const mergeIn = change => (state, action) => ({
  ...state,
  ...(processChange(change, state, action)),
});

export const mergeInState = (stateProp, change, rootStateChange = {}) => (state, action) => ({
  ...state,
  ...processChange(rootStateChange, state, action),
  [stateProp]: {
    ...state[stateProp],
    ...(processChange(change, state, action)),
  },
});

export const mergeDeep = change => (state, action) => ({
  ...(deepMerge(state, processChange(change, state, action), {
    arrayMerge: (destinationArray, sourceArray) => sourceArray,
  })),
});

