An API for population reference data for creating visualizations, deployed on Cloud Foundry using Flask

About
================================================================================

This API is a lightweight service that returns population reference data for plotting a histogram of the age and different comorbidity scores in the patient specific view of the app. The population reference data is segmented by age range, so each patient's data is displayed in the context of their age range.

To Use
================================================================================
Navigate into the `reference-data` folder and use:

`cf push reference-data`

If your API is at the following url: `http://reference-data-api.12.345.678.910.nip.io`, you can use the following two methods:

1. `get-reference-data` - Pass the patients `age` like so: `http://reference-data-api.12.345.678.910.nip.io/v1/get-reference-data?age=42`. This will return a JSON object like the one bellow:
```python
{
‘age’: [43.0, 32.0, 48.0, …],
‘comorbid_mortality’: [1.0, 2.0, 1.5, …],
‘comorbid_severity’: [1.0, 2.0, 1.5, …]
}
```


`http://record-getter.12.345.678.910.nip.io/v1/get-records?admissionIDs=[155684, 135188]`

That returns:
```python
{
  numberDocsReturned: 2,
  documents: [
              {
                hadm_id: 135188,
                patientInfo: {
                ethnicity: "PATIENT DECLINED TO ANSWER",
                gender: "F",
                subject_id: 10431,
                hadm_id: 135188,
                comorbid_severity: 0,
                age: 77,
                dischtime: "2173-05-18T02:10:00.000Z",
                dob: "2096-03-01T00:00:00.000Z",
                insurance: "Medicare",
                diagnosis: "DUODENAL ULCER",
                language: "",
                admission_type: "URGENT",
                marital_status: "DIVORCED",
                comorbid_mortality: 0,
                admittime: "2173-05-05T00:05:00.000Z"
                          }
              },
              {
                hadm_id: 155684,
                patientInfo: {
                ethnicity: "WHITE",
                gender: "M",
                subject_id: 29106,
                hadm_id: 155684,
                comorbid_severity: 2,
                age: 45,
                dischtime: "2132-10-03T15:35:00.000Z",
                dob: "2087-06-17T00:00:00.000Z",
                insurance: "Medicaid",
                diagnosis: "PANCREATITIS;GASTROINTESTINAL BLEED",
                language: "ENGL",
                admission_type: "EMERGENCY",
                marital_status: "SINGLE",
                comorbid_mortality: 1.3333333333333333,
                admittime: "2132-09-25T20:26:00.000Z"
                          }
            }
            ]
}
```

Hope this makes things easier!

