/**
 * Created by prokarma on 8/17/2016.
 */
// app/models/discharge-admissions.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dischargeAdmissionsSchema = new Schema({
  name: String,
  age: Number
});

module.exports = mongoose.model('DischargeAdmission', dischargeAdmissionsSchema);
