import { combineReducers } from 'redux';
import { client } from './reducers/client';
import { cars } from './reducers/cars';
import { requests } from './reducers/requests';

export default combineReducers({
  client,
  cars,
  requests,
});
