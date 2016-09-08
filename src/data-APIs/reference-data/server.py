#!/usr/bin/env python
from flask import Flask, json, request, Response
import pandas as pd
import numpy as np
import json
import requests
import os


########################################################################################################################
# MAIN
########################################################################################################################

app = Flask(__name__)

# Get the port number from the environment variable VCAP_APP_PORT
# When running this app on the local machine, default the port to 8080
port = int(os.getenv('VCAP_APP_PORT', 8080))

referenceDF = pd.read_csv('app-reference-data.csv')
readmissionDF = pd.read_csv('app-readmission-data.csv')

def get_data(df, age):
    if (age < 25) & (age >= 1):
        return df[(df.age < 25) & (df.age >= 1)]
    elif (age >= 25) & (age < 50):
        return df[(df.age >= 25) & (df.age < 50)]
    return df[df.age >= 50]

def convert_reference_to_json(df):
    referenceResult = {'age': list(np.round(df.age.values, 2)),
                       'comorbid_severity': list(np.round(df.avg_severity.values, 2)),
                       'comorbid_mortality': list(np.round(df.avg_mortality.values, 2))}
    return json.dumps(referenceResult)

def convert_readmission_to_json(df):
    readmissionResult = {'readmissionRate': list(df.readmissionRate.values),
                         'date': list(df.date.values)}
    return json.dumps(readmissionResult)
########################################################################################################################
# Routes
########################################################################################################################
# Root welcome.

@app.route('/')
def root():
    response = "I am an API to provide population reference data. I am running on port " + str(port) + ".\n"
    return Response(response, mimetype='text/plain')

@app.route('/v1/get-reference-data', methods=['GET'])
def parse_qs():
    patientAge = request.args.get('patientAge')
    patientReferenceDF = get_data(referenceDF, patientAge)
    jsonResponse = convert_reference_to_json(patientReferenceDF)
    return Response(jsonResponse, mimetype='text/plain')

@app.route('/v1/get-readmission-data', methods=['GET'])
def return_qs():
    jsonResponse = convert_readmission_to_json(readmissionDF)
    return Response(jsonResponse, mimetype='text/plain')

if __name__ == '__main__':
    # Start up the Flask app server.
    app.run(host='0.0.0.0', port=port, debug=True)
