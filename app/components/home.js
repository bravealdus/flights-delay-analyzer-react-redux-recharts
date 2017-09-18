import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as flightActions from '../actions/flights'
import Search from './search/search'
import Results from './results/results'

export class Home extends React.Component {

  render(){
    return (
      <div>
        <h1>Flight Finder</h1>
        <Search {...this.props} />
        <Results {...this.props} />
      </div>
    )
  }
}

export default connect((state) => {
  return ({
    flightsStore: state.flights,
  })
},
  (dispatch) => ({
    flightActions: bindActionCreators(flightActions, dispatch),
    navActions: bindActionCreators({changePage: (page) => push(page)}, dispatch),
  })
)(Home);
