/**
 * Created by prokarma on 8/17/2016.
 */
// app/models/patient.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var patientSchema = new Schema({
  name: String,
  age: Number
});

module.exports = mongoose.model('Patient', patientSchema);
