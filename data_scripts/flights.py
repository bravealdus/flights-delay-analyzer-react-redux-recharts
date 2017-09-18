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


# csvfile = open('../data/data_small.csv', 'r')
csvfile = open('../data/2015-AA-UA-DL-flights.csv', 'r')
rawFlightsFile = list(csv.DictReader(csvfile, fieldnames))

# print(rawFlightsFile)
# quit()

def mk_int(s):
    s = s.strip()
    return int(float(s)) if s else 0

with open('../dist/data/available_origins.json') as data_file:
    origins = json.load(data_file)['results']
    for origin in origins:
        # print 'origin', origin['code']
        with open('../dist/data/dest/'+origin['code']+'_available_dest.json') as data_file2:
            destinies = json.load(data_file2)['results']
            for dest in destinies:

                flightsDict = {}
                count = 0
                flas = 0
                for row in rawFlightsFile:
                    # if count > 10:
                    #     break
                    if row['ORIGIN'] == origin['code'] and row['DEST'] == dest['code']:
                    # if row['ORIGIN'] == 'JFK' and row['DEST'] == 'MIA':
                        count = count + 1
                        # print(count)
                        flightKey = row['UNIQUE_CARRIER']+row['FL_NUM']
                        if flightKey in flightsDict:
                            ++flas
                            #do nothig
                        else:
                            flightsDict[flightKey] = []
                        point = {}
                        point['date'] = row['FL_DATE']
                        point['cancelled'] = mk_int(row['CANCELLED'])
                        point['carrier'] = row['UNIQUE_CARRIER']
                        point['number'] = row['FL_NUM']
                        point['departure'] = row['DEP_TIME']
                        point['departure_delay'] = mk_int(row['DEP_DELAY'])
                        point['arrival'] = row['ARR_TIME']
                        point['arrival_delay'] = mk_int(row['ARR_DELAY'])
                        point['duration'] = mk_int(row['ACTUAL_ELAPSED_TIME'])
                        point['distance'] = mk_int(row['DISTANCE'])
                        flightsDict[flightKey].append(point)
                print origin['code'], '--', dest['code']
                print '--> found', count

                # jsonfile = open('../dist/data/flights/' + 'JFK' + '_' + 'MIA' + '.json', 'w')
                jsonfile = open('../dist/data/flights/' + origin['code'] + '_' + dest['code'] + '.json', 'w')
                ready = {}
                ready['results'] = []

                for key,val in flightsDict.iteritems():
                    point = {}
                    point['code'] = key
                    point['data'] = val                    
                    ready['results'].append(point)

                json.dump(ready, jsonfile)
                jsonfile.write('\n')
