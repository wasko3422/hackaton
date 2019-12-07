export function requests(state = null, action = {}) {
  switch (action.type) {
    case 'FETCH_REQUESTS':
      return action.payload;
    default:
      return state;
  }
}
