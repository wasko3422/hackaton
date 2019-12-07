import { combineReducers } from 'redux';
import { client } from './reducers/client';
import { cars } from './reducers/cars';

export default combineReducers({
  client,
  cars,
});
