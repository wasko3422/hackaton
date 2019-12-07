export function cityCoords(state = null, action = {}) {
  switch (action.type) {
    case 'FETCH_CITY_COORDS':
      return action.payload;
    default:
      return state;
  }
}
