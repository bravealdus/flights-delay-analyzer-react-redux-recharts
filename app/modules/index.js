import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import flights from '../reducers/flights'

export default combineReducers({
  routing: routerReducer,
  flights
})
