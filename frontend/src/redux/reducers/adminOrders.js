export function adminOrders(state = null, action = {}) {
  switch (action.type) {
    case 'FETCH_ADMIN_ORDERS':
      return action.payload;
    case 'DELETE_ADMIN_ORDER':
      return (
        state && state.filter(({ order_id }) => order_id !== action.payload)
      );
    default:
      return state;
  }
}
