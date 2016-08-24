An API for scoring patients about to be discharged, deployed on Cloud Foundry using Flask

To Use
================================================================================
Navigate into the `risk-scorer` folder and use:

`cf push risk-scorer`

If your API is at the following url: `http://risk-scorer.12.345.678.910.nip.io`, and you want to get patient readmission scores for admission ids `121451`, `193408` and `150357` just use the `/v1/score` ending with the admission ids in an array as the data param, like so: 

`http://risk-scorer.12.345.678.910.nip.io/v1/score?data=[121451, 193408, 150357]`

That returns:

```python
{
  121451: {
          readmissionRisk: 0.7333333333333333
  },
  150357: {
          readmissionRisk: 0.4666666666666667
  },
  193408: {
          readmissionRisk: 0.06666666666666667
  }
}
```

