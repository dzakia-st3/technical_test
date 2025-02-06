import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from './slice/counterSlice';

export default combineReducers({
  counter: counterReducer,
});
