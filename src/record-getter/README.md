An API for getting and processing patient info, deployed on Cloud Foundry using Flask
================================================================================

This is a sample application showing how to deploy a simple hello world app
using Cloud Foundry and the Python build pack.



To Use
================================================================================
Navigate into the `record-getter` folder and use:

`cf push record-getter`

If your API is at the following url: `http://record-getter.12.345.678.910.nip.io`, and you want to get patient info for admission ids `155684` and `135188` just use the `/v1/parse` ending with the admission ids in an array as the data param, like so: 

`http://record-getter.12.345.678.910.nip.io/v1/parse?data=[155684, 135188]`

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

