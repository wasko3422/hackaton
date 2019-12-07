export function cities(state = null, action = {}) {
  switch (action.type) {
    case 'FETCH_CITIES':
      return action.payload;
    default:
      return state;
  }
}
