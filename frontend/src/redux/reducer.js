import { combineReducers } from 'redux';

function clientReducer(
  state = {
    id: 1,
  },
  action = {}
) {
  switch (action.type) {
    default:
      return state;
  }
}

export default combineReducers({
  client: clientReducer,
});
