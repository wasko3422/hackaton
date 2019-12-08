export function cars(state = null, action = {}) {
  switch (action.type) {
    case 'FETCH_CARS':
      return action.payload;
    default:
      return state;
  }
}

export function fetchCars() {
  return (dispatch) => {
    axios.get(`/get-cars?client_id=${clientId}`).then((res) =>
      dispatch({
        type: 'FETCH_CARS',
        payload: res.data || [],
      })
    );
  };
}
