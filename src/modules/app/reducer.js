import { handleActions } from 'redux-actions';
import * as types from './types';

const INITIAL_STATE = {
  counter: 0,
};

export default handleActions({
  [types.INCREMENT]: state => ({ counter: state.counter + 1 }),
  [types.DECREMENT]: state => ({ counter: state.counter - 1 }),
}, INITIAL_STATE);
