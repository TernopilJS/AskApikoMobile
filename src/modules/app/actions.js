import { createAction } from 'redux-actions';
import * as types from './types';

export const increment = createAction(types.INCREMENT);
export const decrement = createAction(types.DECREMENT);
