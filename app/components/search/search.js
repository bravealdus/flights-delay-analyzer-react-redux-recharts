import React from 'react'
import {styles} from './styles'

export default class SearchComponent extends React.Component {

  state = {
    origin: false,
    dest: false,
    inputOrigin: '',
    inputDest: '',
    origin_suggestions: [],
    dest_suggestions: []
  }

  componentWillMount() {
    this.props.flightActions.getAvilableOrigins()
  }

  handleOriginInput(event){
    this.setState({inputOrigin: event.target.value})
    const filtered = this.props.flightsStore.avilable_origins.filter((point) => {
      return (
        point.code.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1 ||
        point.city.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1
      )
    })
    this.setState({ origin_suggestions: filtered })
  }

  handleOriginSelect(point){
    this.props.flightActions.getAvilableDest(point.code)
    this.setState({
      inputOrigin: point.code +'-'+ point.city,
      origin: point,
      origin_suggestions: [],
      inputDest: '',
      dest: false,
      dest_suggestions: []
    })
  }

  handleDestSelect(point){
    this.props.flightActions.getFlights(this.state.origin.code, point.code)
    this.setState({
      inputDest: point.code +'-'+ point.city,
      dest: point,
      dest_suggestions: []
    })
  }

  handleDestInput(event){
    this.setState({inputDest: event.target.value})
    const filtered = this.props.flightsStore.avilable_dest.filter((point) => {
      return (
        point.code.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1 ||
        point.city.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1
      )
    })
    this.setState({ dest_suggestions: filtered })
  }

  renderOriginSuggestion(){
    if (!this.state.origin_suggestions.length){
      return
    }
    return (
      <div style={styles.suggestionsWrap}>
        {
          this.state.origin_suggestions.map((point) => {
            return (
                <a key={point.code} onClick={()=>this.handleOriginSelect(point)} href="#" style={styles.suggestionRow}>
                  {point.code} - {point.city}
                </a>
            )
          })
        }
      </div>
    )
  }

  renderDestSuggestion(){
    if (!this.state.dest_suggestions.length){
      return
    }
    return (
      <div style={styles.suggestionsWrap}>
        {
          this.state.dest_suggestions.map((point) => {
            return (
                <a key={point.code} onClick={()=>this.handleDestSelect(point)} href="#" style={styles.suggestionRow}>
                  {point.code} - {point.city}
                </a>
            )
          })
        }
      </div>
    )
  }

  render() {
    return (
      <div style={styles.inputsWrap}>

        <div style={styles.box}>
          <input
            type='text'
            placeholder="From - Airport or City"
            value={this.state.inputOrigin}
            onChange={(e)=>this.handleOriginInput(e)}
          />
          { this.renderOriginSuggestion() }
        </div>

        <div style={styles.box}>
          <input
            type='text'
            placeholder="To - Airport or City"
            value={this.state.inputDest}
            onChange={(e)=>this.handleDestInput(e)}
          />
          { this.renderDestSuggestion() }
        </div>

      </div>
    )
  }
}
