import csv
import json

fieldnames = (
    'FL_DATE',
    'UNIQUE_CARRIER',
    'FL_NUM',
    'ORIGIN',
    'ORIGIN_CITY_NAME',
    'ORIGIN_STATE_ABR',
    'DEST',
    'DEST_CITY_NAME',
    'DEST_STATE_ABR',
    'CRS_DEP_TIME',
    'DEP_TIME',
    'DEP_DELAY',
    'CRS_ARR_TIME',
    'ARR_TIME',
    'ARR_DELAY',
    'CANCELLED',
    'DIVERTED',
    'CRS_ELAPSED_TIME',
    'ACTUAL_ELAPSED_TIME',
    'DISTANCE',
    'CARRIER_DELAY',
    'WEATHER_DELAY',
    'NAS_DELAY',
    'SECURITY_DELAY',
    'LATE_AIRCRAFT_DELAY'
)

import csv
import json

with open('../dist/data/available_origins.json') as data_file:
    origins = json.load(data_file)['results']
    for origin in origins:
        print(origin['code'])
        data = {}
        csvfile = open('../data/2015-AA-UA-DL-flights.csv', 'r')
        flights = csv.DictReader( csvfile, fieldnames)
        for flight in flights:
            if flight['ORIGIN'] == origin['code']:
                point = {}
                point['code'] = flight['DEST']
                point['city'] = flight['DEST_CITY_NAME']
                data[flight['DEST']] = point

        jsonfile = open('../dist/data/dest/' + origin['code'] + '_available_dest.json', 'w')
        results = []
        for key, value in data.items():
            results.append(value)

        ready = {}
        ready['results'] = results

        json.dump(ready, jsonfile)
        jsonfile.write('\n')
