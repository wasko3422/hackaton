export function dealers(state = null, action = {}) {
  switch (action.type) {
    case 'FETCH_DEALERS':
      return action.payload;
    default:
      return state;
  }
}
