#!/usr/bin/env python
from flask import Flask, json, request, Response
from record_parser import parse_records, dataframe_to_docs
import ast
import os


########################################################################################################################
# MAIN
########################################################################################################################

app = Flask(__name__)

# Get the port number from the environment variable VCAP_APP_PORT
# When running this app on the local machine, default the port to 8080
port = int(os.getenv('VCAP_APP_PORT', 8080))

# These are the MongoDB api endpoints for the application.
# These urls are needed to work with the parse_records script.
admissionsURL = "http://my-app-name.my-tap-domain.io/api/discharge-admissions"
comorbidsURL = "http://my-app-name.my-tap-domain.io/api/discharge-comorbids"
patientsURL = "http://my-app-name.my-tap-domain.io/api/discharge-patients"
urls = [admissionsURL, comorbidsURL, patientsURL]

########################################################################################################################
# Routes
########################################################################################################################
# Root welcome.

@app.route('/')
def root():
    response = "I am a record parser running on port " + str(port) + ".\n"
    return Response(response, mimetype='text/plain')

@app.route('/v1/parse', methods=['GET'])
def parse_qs():
    input = request.args.get('data')
    # Convert the string input from the data payload into a literal array of discharge IDs
    dischargeIDs = ast.literal_eval(input)
    # Run the parse and format scripts
    dataFrame = parse_records(urls, dischargeIDs)
    response = dataframe_to_docs(dataFrame)
    print "response: ", response
    return Response(response, mimetype='text/plain')

if __name__ == '__main__':
    # Start up the Flask app server.
    app.run(host='0.0.0.0', port=port, debug=True)
