import React from 'react'

export default class SearchComponent extends React.Component {

  state = {
    origin: false,
    dest: false,
    inputOrigin: '',
    inputDest: '',
    origin_suggestions: [],
    dest_suggestions: []
  }

  getValueString(point){
    return `${point.code} - ${point.city}`
  }

  handleChangeOrigin(event){
    this.setState({inputOrigin: event.target.value})
    const filtered = this.props.flightsStore.avilable_origins.filter((point) => {
      return point.code.includes(event.target.value) || point.city.includes(event.target.value)
    })
    this.setState({ origin_suggestions: filtered })
  }

  handleChangeDest(event){
    this.setState({inputDest: event.target.value})
  }

  componentWillMount() {
    this.props.flightActions.getAvilableOrigins()
  }

  renderOriginSuggestion(){

    return (
      this.state.origin_suggestions.map((org) => {
        return (
          <div key={org.code}>
            {this.getValueString(org)}
          </div>
        )
      })
    )
  }

  render() {
    return (
      <div>
        <input
          type='text'
          placeholder="From - Airport or City"
          value={this.state.inputOrigin}
          onChange={(e)=>this.handleChangeOrigin(e)}
        />
        <input
          type='text'
          placeholder="To - Airport or City"
          value={this.state.inputDest}
          onChange={(e)=>this.handleChangeDest(e)}
        />
        {
          this.renderOriginSuggestion()
        }
      </div>
    )
  }
}
