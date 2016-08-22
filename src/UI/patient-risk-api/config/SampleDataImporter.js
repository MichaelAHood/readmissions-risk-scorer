/**
 * Created by prokarma on 8/19/2016.
 */
var fs = new require('fs');

module.exports = function(admission, comorbid, patient) {
    var importer = {
        populateAdmissionsSampleDataIfNone: function(){
            admission.find(function(error, admissions){
                if(error){
                    console.log(error);
                    return;
                }
                if(admissions){
                    if(admissions.length === 0){
                        console.log('No Admission Sample Data! Loading...')

                        var lines = fs.readFileSync('./app/sampledata/discharge-admissions.psv').toString().split('\n');
                        lines.shift(); // Shift the headings off the list of records.

                        var entries = 0;
                        while (lines.length) {
                            var line = lines.shift();
                            var newAdmission = new admission();

                            var values = line.split('|');

                            if(values) {
                                newAdmission.row_id = values[0];
                                newAdmission.subject_id = values[1];
                                newAdmission.hadm_id = values[2];
                                if (values[3] !== 'null') {
                                    newAdmission.admittime = values[3];
                                }
                                if (values[4] !== 'null') {
                                    newAdmission.dischtime = values[4];
                                }
                                if (values[5] !== 'null') {
                                    newAdmission.deathtime = values[5];
                                }
                                newAdmission.admission_type = values[6];
                                newAdmission.admission_location = values[7];
                                newAdmission.discharge_location = values[8];
                                newAdmission.insurance = values[9];
                                newAdmission.language = values[10];
                                newAdmission.religion = values[11];
                                newAdmission.marital_status = values[12];
                                newAdmission.ethnicity = values[13];
                                if (values[14] !== 'null') {
                                    newAdmission.edregtime = values[14];
                                }
                                if (values[15] !== 'null') {
                                    newAdmission.edouttime = values[15];
                                }
                                newAdmission.diagnosis = values[16];
                                newAdmission.hospital_expire_flag = values[17];
                                newAdmission.has_ioevents_data = values[18];
                                newAdmission.has_chartevents_data = values[19];

                                newAdmission.save(function (error) {
                                    if (error) {
                                        console.log(error);
                                    }
                                });

                                entries++;
                            } else{
                                console.log('Error parsing lines of Admissions.');
                            }
                        }

                        console.log('Finished loading [' + entries + '] Admission Sample Data!');
                    } else{
                        console.log('Currently [' + admissions.length + '] admissions.')
                    }

                }
            });
        },
        populateComorbidsSampleDataIfNone: function(){
            comorbid.find(function(error, comorbids){
                if(error){
                    console.log(error);
                    return;
                }
                if(comorbids){
                    if(comorbids.length === 0){
                        console.log('No Comorbids Sample Data! Loading...');

                        var lines = fs.readFileSync('./app/sampledata/discharge-comorbids.psv').toString().split('\n');
                        lines.shift(); // Shift the headings off the list of records.

                        var entries = 0;
                        while (lines.length) {
                            var line = lines.shift();
                            var newComorbid = new comorbid();

                            var values = line.split('|');

                            if(values) {
                                newComorbid.row_id = values[0];
                                newComorbid.subject_id = values[1];
                                newComorbid.hadm_id = values[2];
                                newComorbid.drg_type = values[3];
                                newComorbid.drg_code = values[4];
                                newComorbid.description = values[5];
                                newComorbid.drg_severity = values[6];
                                newComorbid.drg_mortality = values[7];

                                newComorbid.save(function (error) {
                                    if (error) {
                                        console.log(error);
                                    }
                                });

                                entries++;
                            } else{
                                console.log('Error parsing lines of Comorbids.');
                            }
                        }

                        console.log('Finished loading [' + entries + '] Comorbids Sample Data!');
                    } else{
                        console.log('Currently [' + comorbids.length + '] comorbids.');
                    }
                }
            });
        },
        populatePatientSampleDataIfNone: function() {
            patient.find(function (error, patients) {
                if (error) {
                    console.log(error);
                    return;
                }
                if (patients) {
                    if (patients.length === 0) {
                        console.log('No Patients Sample Data! Loading...');

                        var lines = fs.readFileSync('./app/sampledata/discharge-patients.psv').toString().split('\n');
                        lines.shift(); // Shift the headings off the list of records.

                        var entries = 0;
                        while (lines.length) {
                            var line = lines.shift();
                            var newPatient = new patient();

                            var values = line.split('|');

                            if(values) {
                                newPatient.row_id = values[0];
                                newPatient.subject_id = values[1];
                                newPatient.gender = values[2];
                                if(values[3] !== 'null'){
                                    newPatient.dob = values[3];
                                }
                                if(values[4] !== 'null'){
                                    newPatient.dod = values[4];
                                }
                                if(values[5] !== 'null'){
                                    newPatient.dod_hosp = values[5];
                                }
                                if(values[6] !== 'null'){
                                    newPatient.dod_ssn = values[6];
                                }
                                newPatient.expire_flag = values[7];

                                newPatient.save(function (error) {
                                    if (error) {
                                        console.log(error);
                                    }
                                });

                                entries++;
                            } else{
                                console.log('Error parsing lines of Comorbids.');
                            }
                        }

                        console.log('Finished loading [' + entries + '] Patients Sample Data!');
                    } else {
                        console.log('Currently [' + patients.length + '] patients.');
                    }
                }
            });
        }
    };
    return importer;
}