export const DATA_REQUESTED = 'data/START_API_CALL'
export const FETCH_ORIGINS_SUCCESS = 'data/FETCH_ORIGINS_SUCCESS'
export const FETCH_DEST_SUCCESS = 'data/FETCH_DEST_SUCCESS'
export const FETCH_FLIGHTS_SUCCESS = 'data/FETCH_FLIGHTS_SUCCESS'

const initialState = {
  isFetching: false,
  flights: [],
  avilable_origins: [],
  avilable_dest: [],
  selected_origin: '',
  selected_dest: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case DATA_REQUESTED:
      return {
        ...state,
        isFetching: true,
      }

    case FETCH_ORIGINS_SUCCESS:
      return {
        ...state,
        avilable_origins: action.results,
        isFetching: false
      }

    case FETCH_DEST_SUCCESS:
      return {
        ...state,
        avilable_dest: action.results,
        isFetching: false
      }

    case FETCH_FLIGHTS_SUCCESS:
      return {
        ...state,
        flights: action.results,
        selected_origin: action.selected_origin,
        selected_dest: action.selected_dest,
        isFetching: false
      }

    default:
      return state
  }
}
