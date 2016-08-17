/**
 * Created by prokarma on 8/17/2016.
 */
// server.js

//Call packages
var express = new require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = new require('mongoose');
var DischargeAdmission = require('./app/models/discharge-admissions');
var DischargeComobids = require('./app/models/discharge-comorbids');
var DischargePatient = require('./app/models/discharge-patient');

//Configuration
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/Patients');

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
  response.json({ message: 'NodeJS Api is working.' });
});

router.route('/patients')
  .post(function(request, response){
    var patient = new DischargeAdmission();

   /* patient.name = request.body.name;
    patient.age = request.body.age;
   */
    console.log('Name: ' + patient.name + ' Age: ' + patient.age);

    patient.save(function(error){
      if(error){
        response.send(error);
      }

      response.json({
        message: 'DischargeAdmission created!',
        patient: patient
      });
    });
  })
  .get(function(request, response){
    DischargeAdmission.find(function(error, patients){
      if(error){
        response.send(error);
      }
      response.json(patients);
    });
  });

router.route('/patients/:patient_id')
  .get(function(request, response){
    DischargeAdmission.findById(request.params.patient_id, function(error, patient){
      if(error){
        response.send(error);
      }
      response.json(patient);
    });
  })
  .put(function(request, response){
    DischargeAdmission.findById(request.params.patient_id, function(error, patient){

      if(error){
        response.send(error);
      }

      var previous = new DischargeAdmission();
      previous.name = patient.name;
      previous.age = patient.age;

      patient.name = request.body.name;
      patient.age = request.body.age;

      patient.save(function(error){
        if(error){
          response.send(error);
        }

        response.json({
          message: 'DischargeAdmission updated!',
          previous: previous,
          updated: patient
        });
      });
    });
  })
  .delete(function(request, response){
    DischargeAdmission.remove({_id: request.params.patient_id
    }, function(error, patient){
      if(error){
        response.send(patient);
      }
      response.json({
        message: 'Successfully deleted',

        patient: patient
      });
    });
  });

//Register Routes
app.use('/api', router);

//start server
app.listen(port);

console.log('Api is running on port:' + port);
