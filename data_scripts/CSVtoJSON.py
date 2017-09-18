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

# csvfile = open('../data/2015-AA-UA-DL-flights.csv', 'r')
# jsonfile = open('../dist/full_clean_data.json', 'w')

csvfile = open('../data/data_small.csv', 'r')
jsonfile = open('../dist/small_clean_data.json', 'w')


reader = csv.DictReader( csvfile, fieldnames)
for row in reader:
    if row['CANCELLED'] == '0.00' and row['DIVERTED'] == '0.00':
        data = {}
        data['day'] = row['FL_DATE']
        data['airline'] = row['UNIQUE_CARRIER']
        data['nmber'] = row['FL_NUM']
        data['origin_airport'] = row['ORIGIN']
        data['origin_city'] = row['ORIGIN_CITY_NAME']
        data['origin_state'] = row['ORIGIN_STATE_ABR']
        data['dest_airport'] = row['DEST']
        data['dest_city'] = row['DEST_CITY_NAME']
        data['dest_state'] = row['DEST_STATE_ABR']
        data['dep_time'] = row['DEP_TIME']
        data['arr_time'] = row['ARR_TIME']
        data['duration'] = row['ACTUAL_ELAPSED_TIME']
        data['distance'] = row['DISTANCE']
        json.dump(data, jsonfile)
        jsonfile.write(',')
    else:
        print('NOT', row['FL_NUM'], row['CANCELLED'], row['DIVERTED'])
