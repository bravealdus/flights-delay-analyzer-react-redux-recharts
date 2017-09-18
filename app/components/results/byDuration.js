import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts'
import moment from 'moment'
import CustomTooltip, {CustomBar} from './CustomObjects'

export default class DeparturesComponent extends React.Component {

  render() {
    const firstDepartureHour = this.props.data[0].firstDepartureHour
    const data = this.props.data
    .sort((a,b)=>{
      if (a.duration < b.duration) { return -1 }
      if (a.duration > b.duration) { return 1 }
      return 0;
    })

    return (
      <div>
        <BarChart
          width={document.body.clientWidth - 120}
          height={data.length * 60}
          data={data}
          layout="vertical"
          maxBarSize={30}>
          <Bar stackId="a" dataKey="offset" fill="transparent" />
          <Bar
            label={false}
            name={'duration'}
            unit={'hs'}
            stackId="a"
            dataKey="hours"
            shape={CustomBar}/>
          <YAxis hide type="category" dataKey="uberName" />
          <XAxis
            height={70}
            interval="preserveStartEnd"
            tickLine={false}
            domain={['dataMin', 'dataMax']}
            orientation="top"
            type="number"
            tickFormatter={(duration) => {
              return moment(firstDepartureHour, 'HHmm').add(duration, 'hours').format('LT')
            }}
          />
          <Tooltip cursor={false} content={<CustomTooltip/>}/>

        </BarChart>
      </div>
    )
  }

}