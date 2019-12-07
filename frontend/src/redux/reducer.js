import { combineReducers } from 'redux';
import { client } from './reducers/client';
import { cars } from './reducers/cars';
import { requests } from './reducers/requests';
import { completedOrders } from './reducers/completedOrders';

export default combineReducers({
  client,
  cars,
  requests,
  completedOrders,
});
