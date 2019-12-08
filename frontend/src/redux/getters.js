import axios from 'axios';

export function getCars(search) {
  return (dispatch) => {
    axios.get(`/get-cars${search}`).then((res) =>
      dispatch({
        type: 'FETCH_CARS',
        payload: res.data || [],
      })
    );
  };
}

export function getCityCoords(query, accessToken) {
  return (dispatch) => {
    axios
      .get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?limit=1&access_token=${accessToken}`
      )
      .then((res) =>
        dispatch({
          type: 'FETCH_CITY_COORDS',
          payload: res.data || [],
        })
      );
  };
}

export function getCities() {
  return (dispatch) => {
    axios.get('/get-cities').then((res) =>
      dispatch({
        type: 'FETCH_CITIES',
        payload: res.data || [],
      })
    );
  };
}

export function getJobs() {
  return (dispatch) => {
    axios.get('/get-jobs').then((res) =>
      dispatch({
        type: 'FETCH_JOBS',
        payload: res.data || [],
      })
    );
  };
}

export function getDealers({ cityId, carId }) {
  if (!cityId || !carId) return () => {};
  return (dispatch) => {
    axios
      .get(`/get-dealers?city_id=${cityId.value}&car_id=${carId.value}`)
      .then((res) =>
        dispatch({
          type: 'FETCH_DEALERS',
          payload: res.data || [],
        })
      );
  };
}
