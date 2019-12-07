export function completedOrders(state = null, action = {}) {
  switch (action.type) {
    case 'FETCH_COMPLETED_ORDERS':
      return action.payload;
    default:
      return state;
  }
}
