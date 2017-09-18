import moment from 'moment'

const dateFormat = 'YYYY-MM-DDHHmm'

function normal(val, max, min) { return (val - min) / (max - min) }

export const calculateTimelines = (flight) => {
	let info = {
		delay_score: 0,
		avg_arr_delay: 0,
		avg_dep_delay: 0,
		avg_delay: 0,
		cancellations: 0,
		totalFlights: 0,
		delaysPerDay:[
			{day: 'Mo', avg_delay: 0, count: 0},
			{day: 'Tu', avg_delay: 0, count: 0},
			{day: 'We', avg_delay: 0, count: 0},
			{day: 'Th', avg_delay: 0, count: 0},
			{day: 'Fr', avg_delay: 0, count: 0},
			{day: 'Sa', avg_delay: 0, count: 0},
			{day: 'Su', avg_delay: 0, count: 0},
		]
	}

	for (var i = flight.data.length - 1; i >= 0; i--) {
		info.totalFlights++
		const day = flight.data[i]

		const weekDay = moment(day.date+flight.departure, dateFormat).format('dd')
		info.delaysPerDay.map((wDay) => {
			if(weekDay === wDay.day){
				wDay.avg_delay = day.departure_delay + day.arrival_delay
				wDay.count++
			}
		})

		info.avg_dep_delay += day.departure_delay
		info.avg_arr_delay += day.arrival_delay

		if (day.cancelled) {
			info.cancellations++
		}
	}

	info.delaysPerDay.map((wDay) => {
		wDay.avg_delay = Math.max(0, wDay.avg_delay / wDay.count)
	})

	info.avg_dep_delay = Math.max(0, info.avg_dep_delay / flight.data.length)
	info.avg_arr_delay = Math.max(0, info.avg_arr_delay / flight.data.length)
	info.avg_delay = info.avg_dep_delay + info.avg_arr_delay

	// Normal value from 1 to 5, assumes a cancellation is a day worth of delay
	info.score = normal(info.avg_delay + (info.cancellations * 1440), 1, 5) 

	return info
}

export const PrepareData = (rawData, props, state) => {
	if (!rawData.length) { return [] }
	
	let cleanData = rawData
	.filter((flight) => {
		if (state.carriersFilter[flight.data[0].carrier] === false) {
			return false
		}
		let allCancelled = true
		for (var i = flight.data.length - 1; i >= 0; i--) {
			if (flight.data[i].cancelled == false) {
				allCancelled = false
				break
			}
		}
		if (allCancelled){ return false }
	return true
	})

	if (!cleanData.length) { return [] }

	// The first place to depart, use to plot the most left flight
	const firstDepartureHour = cleanData.map((f)=>f.data[0].departure || 1200).reduce((p, v)=>(p < v ? p : v))

	return cleanData.map((flight) => {
		// Use the first flight not cancelled to show the duration bar
		let displayFlight = null
		for (var i = flight.data.length - 1; i >= 0; i--) {
			if (!flight.data[i].cancelled) {
				displayFlight = flight.data[i]
				break
			}
		}

		// Use a fixed day to show the graph
		const fullDate = '2015-06-06' + displayFlight.departure
		const day = moment('2015-06-06' + firstDepartureHour, dateFormat)
		const startTime = moment(fullDate, dateFormat)
		const end = moment(fullDate, dateFormat).add(displayFlight.duration, 'minutes')
		const duration = moment.duration(end.diff(startTime))
		const hours = duration.asHours()
		const offset = moment.duration(startTime.diff(day)).asHours()

	return {
		number: displayFlight.number,
		carrier: displayFlight.carrier,
		uberName: displayFlight.carrier + ' ' + displayFlight.number,
		origin: props.flightsStore.selected_origin,
		dest: props.flightsStore.selected_dest,
		departure: displayFlight.departure,
		arrival: displayFlight.arrival,
		duration: displayFlight.duration,
		distance: displayFlight.distance,
		durationMoment: duration,
		timeliness: calculateTimelines(flight),
		firstDepartureHour,
		offset,
		startTime,
		end,
		hours,
		}
	})
}