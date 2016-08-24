Python on Cloud Foundry using Flask
================================================================================

This is a sample application showing how to deploy a simple hello world app
using Cloud Foundry and the Python build pack.



To Use
================================================================================

```
cf push myappname
```

http://risk-scorer.52.204.218.231.nip.io/v1/score?data=[121451, 193408, 150357]

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


or click the button below

