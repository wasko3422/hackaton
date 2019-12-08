export function jobs(state = null, action = {}) {
  switch (action.type) {
    case 'FETCH_JOBS':
      return action.payload;
    default:
      return state;
  }
}
