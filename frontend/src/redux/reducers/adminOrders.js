export function adminOrders(state = null, action = {}) {
  switch (action.type) {
    case 'FETCH_ADMIN_ORDERS':
      return action.payload;
    case 'DELETE_ADMIN_ORDER':
      return (
        state && state.filter(({ order_id }) => order_id !== action.payload)
      );
    case 'SENT_ADMIN_ORDER':
      return (
        state &&
        state.map((entity) =>
          entity.order_id === action.payload
            ? { ...entity, order: { ...entity.order, status: 'sent' } }
            : entity
        )
      );
    default:
      return state;
  }
}
