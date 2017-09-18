import {
  DATA_REQUESTED,
  FETCH_ORIGINS_SUCCESS,
  FETCH_DEST_SUCCESS,
  FETCH_FLIGHTS_SUCCESS
} from '../reducers/flights'

export const getFlights = (origin, dest) => {
  return (dispatch) => {
    dispatch({ type: DATA_REQUESTED })
    const url = '/data/flights/'+origin+'_' + dest + '.json'
    fetch(url).then((res) => {
      res.json().then((data) => {
        dispatch({
          results: data.results,
          selected_origin: origin,
          selected_dest: dest,
          type: FETCH_FLIGHTS_SUCCESS
        })
      })
    })
  }
}

export const getAvilableDest = (originCode) => {
  return (dispatch) => {
    dispatch({ type: DATA_REQUESTED })

    const url = '/data/dest/'+originCode+'_available_dest.json'
    fetch(url).then((res) => {
      res.json().then((data) => {
        dispatch({
          results: data.results,
          type: FETCH_DEST_SUCCESS
        })
      })
    })
  }
}

export const getAvilableOrigins = () => {
  return (dispatch) => {
    dispatch({ type: DATA_REQUESTED })

    const url = '/data/available_origins.json'
    fetch(url).then((res) => {
      res.json().then((data) => {
        dispatch({
          results: data.results,
          type: FETCH_ORIGINS_SUCCESS
        })
      })
    })
  }
}
