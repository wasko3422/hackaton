import { combineReducers } from 'redux';
import { client } from './reducers/client';
import { cars } from './reducers/cars';
import { cities } from './reducers/cities';
import { cityCoords } from './reducers/cityCoords';
import { dealers } from './reducers/dealers';
import { jobs } from './reducers/jobs';
import { requests } from './reducers/requests';
import { completedOrders } from './reducers/completedOrders';

export default combineReducers({
  client,
  cars,
  cities,
  cityCoords,
  dealers,
  jobs,
  requests,
  completedOrders,
});
