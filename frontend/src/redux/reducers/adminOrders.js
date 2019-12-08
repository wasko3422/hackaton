export function adminOrders(state = null, action = {}) {
  switch (action.type) {
    case 'FETCH_ADMIN_ORDERS':
      return action.payload;
    default:
      return state;
  }
}
