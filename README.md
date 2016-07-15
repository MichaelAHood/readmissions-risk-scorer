# readmissions-risk-scorer
This is a temporary repo for the Intel-TAP readmission risk scoring model reference architecture

This intent is for this repo to be a one-stop source for everything you need to take your own hispital patient data, load that data into TAP, extract and process the relevant features, and train a model to preidct which patients are likely to be readmitted withing some amount of time.

This tutorial takes as given that you have access to a running TAP VPC (version 0.7), have access to patient data in CSV format, have permissions to upload data to the HDFS data catalog, and can create Jupyter notebook instances.

## Overview
1. First, we will cover how to upload patient data to the Data Catalog.
2. Second, we will demonstrate how to create a Jupyter notebook running Pyspark and load the patient data for analysis.
3. Next, we will select a classifier model to identify patients at risk of readmission.
4. Then, we will discuss how to tune model parameters, evaluate the models performance, and disucuss common risks and 'gotchas' to be aware of when modeling.
5. Finally, we will show how to deploy the model as a REST api so that medical staff can begin identifying which patients are most at risk of readmission.

## 1. Loading the data into the Data Catalog

1. First, log in to the console for your TAP VPC. It should look something like this:

![Data Catalog](/data-catalog.png)

For this exercise, I am using the MIMIC-III dataset, which can be accessed at: https://mimic.physionet.org/

In this case, the data we are using are is tables called ADMISSIONS.csv, PATIENTS.csv, and DRGCODES.csv. Here is brief description of the data in each and why we want it.

a. ADMISSIONS.csv - contains the unique patient id ('SUBJECT_ID'), unique admission id ('HADM_ID'), the type of admissions (e.g. 'EMERGENCY', 'ELECTIVE', 'NEWBORN' etc.), time of patient admission ('ADMITTIME'), time of patient discharge ('DISCHTIME') and some socioeconomic and demographic features like 'ETHNICITY', 'LANGUAGE', 'INSURANCE', etc.
'ADMIT_TYPE', etc.
