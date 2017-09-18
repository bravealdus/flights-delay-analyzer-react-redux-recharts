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

csvfile = open('../data/2015-AA-UA-DL-flights.csv', 'r')
# csvfile = open('../data/data_small.csv', 'r')
jsonfile = open('../dist/avilable_origins.json', 'w')


reader = csv.DictReader( csvfile, fieldnames)

data = {}



for row in reader:
    if row['CANCELLED'] == '0.00' and row['DIVERTED'] == '0.00':
        point = {}
        point['code'] = row['ORIGIN']
        point['city'] = row['ORIGIN_CITY_NAME']

        data[row['ORIGIN']] = point

results = []
for key, value in data.items():
    results.append(value)

ready = {}
ready['results'] = results

json.dump(ready, jsonfile)
jsonfile.write('\n')
