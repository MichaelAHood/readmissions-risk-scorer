/**
 * Created by prokarma on 8/17/2016.
 */
// server.js

//Call packages

var mongoConfig = new require('./config/mongodb.js');
var db = mongoConfig();

var express = new require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = new require('mongoose');
var DischargeAdmission = require('./app/models/discharge-admission');
var DischargeComorbids = require('./app/models/discharge-comorbid');
var DischargePatient = require('./app/models/discharge-patient');

//Configuration
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


mongoose.connect(db.connectionString);

var port = process.env.PORT || 9090;

//Routes for API
var router = express.Router();

router.use(function(request, response, next){
  console.log('Routerness is happening.');
  next();
});

//Test route
//http://localhost:9090/api
router.get('/', function(request, response){
  response.json({
      message: 'Readmission Risk Patient Select api is running.',
      availableResources: [
          '/discharge-admissions GET discharge-admission[]',
          '/discharge-comorbids GET discharge-comorbid[]',
          '/discharge-patients GET dishcare-patient[]'
      ]
  });
});

router.route('/discharge-admissions')
   .get(function(request, response){
    DischargeAdmission.find(function(error, patients){
      if(error){
        response.send(error);
      }
      response.json(patients);
    });
  });

router.route('/discharge-comorbids')
    .get(function(request, response){
      DischargeComorbids.find(function(error, comorbids){
        if(error){
          response.send(comorbids);
        }
        response.json(comorbids);
      });
    });

router.route('/discharge-patients')
    .get(function (request, response){
      DischargePatient.find(function(error, patients){
        if(error){
          response.send(error);
        }
        response.json(patients);
      });
    });

//Register Routes
app.use('/api', router);

//start server
app.listen(port);

console.log('Api is running on port:' + port);
