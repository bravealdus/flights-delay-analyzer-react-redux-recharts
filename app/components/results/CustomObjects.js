import React from 'react'
import moment from 'moment'
import {
  BarChart, Bar, 
  XAxis, 
  // YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts'

export const CarrierName = (code) => {
  const names = {
    'DL': 'Delta',
    'AA': 'American Airlines',
    'UA': 'United Airlines'
  }
  return names[code] || code
}

export const CustomBar = (props) => {
  const { x, y, width, height, payload} = props;
  const colors = {
    'DL': '#862633',
    'AA': '#4885ed',
    'UA': '#4885ed'
  }
  if (x === +x && y === +y) {
    return (
      <g>
        <rect x={x} y={y} width={width} height={height} stroke="black" fill={colors[payload.carrier]} strokeWidth="1"/>
        <text x={x - 20 + width/2} y={y + 5 + height/2} fontFamily="Verdana" fontSize="10" fill="black">{payload.uberName}</text>
      </g>
    ) 
  }
  return null
}

export default class CustomTooltip extends React.Component {

  render() {
    const { active } = this.props;

    if (active) {
      const data = this.props.payload[0].payload

      return (
        <div style={{backgroundColor: 'white', border: '1px solid #333', borderRadius: 3, padding: 10}}>
          <h3>{CarrierName(data.carrier)} {data.number}</h3>
          <h4>{data.origin} &rarr; {data.dest}</h4>
            <div style={{display: 'flex', flexDirection: 'row',justifyContent: 'space-between', alignItems: 'flex-end'}}>
            <div>
              <div>{data.startTime.format('LT')} {data.end.format('LT')}</div>
              <div>{
                moment.utc(data.durationMoment.as('milliseconds')).format('h[h] m[m]')
              }</div>
              <div>{data.distance}mi</div>
              <div>{Math.ceil(data.distance/data.hours)}mph</div>
              <div>------------</div>
              <div>average delay {data.timeliness.avg_delay.toFixed(0)}m</div>
              <div>cancelations {data.timeliness.cancellations}</div>
              <small>analyzed flights {data.timeliness.totalFlights}</small>
            </div>
            <div style={{paddingLeft: 20}}>
              <div style={{textAlign: 'center'}}>delays</div>
              <BarChart width={250} height={150} data={data.timeliness.delaysPerDay}>
               <Bar dataKey='avg_delay' fill='#db3236'/>
               <XAxis 
                type="category"
                tickLine={false}
                interval={0}
                tickCount={7}
                dataKey="day"/>
             </BarChart>
            </div>
          </div>
          
        </div>
      );
    }
    return null;
  }
}
