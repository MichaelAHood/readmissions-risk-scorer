/**
 * Created by prokarma on 8/22/2016.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var processedPatientSchema = new Schema({
    subject_id: Number,
    hadm_id: Number,
    admission_type: String,
    ethnicity: String,
    insurance: String,
    language: String,
    marital_status: String,
    avg_drg_severity: Number,
    avg_drg_mortality: Number,
    age: Number,
    gender: String
});

module.exports = mongoose.model('ProcessedPatients', processedPatientSchema);