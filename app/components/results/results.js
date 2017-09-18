import React from 'react';
import ByDepartures from './byDepartures'
import ByArrival from './byArrival'
import ByDuration from './byDuration'
import ByTimeliness from './byTimeliness'
import {PrepareData} from './DataHandler'
import {CarrierName} from './CustomObjects'


export default class ResultsComponent extends React.Component {

  state = {
    tabs: ['Departure', 'Arrival', 'Duration', 'Timeliness'],
    carriers: [],
    carriersFilter: {},
    selected: 'Departure',
  }

  median(values) {
    values.sort((a,b) => a-b)
    let half = Math.floor(values.length/2)
    if(values.length % 2) {
      return values[half]
    } else {
      return (values[half-1] + (values[half]) / 2.0)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.flightsStore.flights.length){ return }
    let mapFilter = {}
    const newCarriers = nextProps.flightsStore.flights.map((flight) => {
      mapFilter[flight.data[0].carrier] = true
      return flight.data[0].carrier
    })
    this.setState({
      carriers: [...new Set(newCarriers)],
      carriersFilter: mapFilter
    })
  }

  getClassButton(name){
    if (name === this.state.selected){
      return 'btn btn-primary'
    } else {
      return 'btn btn-secondary'
    }
  }

  render() {
    const cleanData = PrepareData(this.props.flightsStore.flights, this.props, this.state)
    const onlyDelays = cleanData.map((flight) => flight.timeliness.avg_delay)
    const medianValue = this.median(onlyDelays)

    return (
      <div style={{marginTop: 30}}>
        <div>median delay {medianValue.toFixed(2)}m</div>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
          <div>
            {
              this.state.tabs.map((tab)=>{
                return (
                  <button
                    key={tab}
                    onClick={()=> this.setState({ selected: tab })}
                    type="button"
                    className={this.getClassButton(tab)}>
                    {tab}
                  </button>
                )
              })
            }
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
          }}>
            {
              this.state.carriers.map((code) => {
                return (
                  <div key={code} style={{paddingRight: 30}}>
                    <input 
                    checked={this.state.carriersFilter[code]}
                    onChange={(e) => {
                      this.setState({carriersFilter: {
                        ...this.state.carriersFilter,
                        [code]: e.target.checked
                      }})
                    }} type="checkbox" className="form-check-input" />
                    <label>{CarrierName(code)}</label>
                  </div>
                )
              })
            }
          </div>

        </div>

        <div style={{
          padding: 40,
          border: '2px solid #333',
          borderRadius: 3
        }}>
          {
            this.state.selected === 'Departure' && cleanData.length > 0 ?
            <ByDepartures {...this.props} data={cleanData} />
            :
            this.state.selected === 'Arrival' && cleanData.length > 0 ?
            <ByArrival {...this.props} data={cleanData} />
            :
            this.state.selected === 'Duration' && cleanData.length > 0 ?
            <ByDuration {...this.props} data={cleanData} />
            :
            this.state.selected === 'Timeliness' && cleanData.length > 0 ?
            <ByTimeliness {...this.props} data={cleanData} medianValue={medianValue}/>
            :
            null
          }

        </div>
      </div>

    )
  }

}
