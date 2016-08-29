import { Injectable } from '@angular/core';
import {Http, Response, Headers, URLSearchParams} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Patient } from '../models';
import {RiskScore} from "../models";

@Injectable()
export class PatientService {

  private patientUri = 'http://patient-risk-api.52.204.218.231.nip.io/api/processed-patients';
  private riskScoreUri = 'http://risk-scorer.52.204.218.231.nip.io/v1/score-patients';


  constructor(private http: Http) { }

  getAllPatients(): Observable<Patient[]>{
    let patients$ = this.http
      .get(`${this.patientUri}`, {headers: this.getHeaders()})
      .map(mapPatients)
      .catch(handleError);
    return patients$;
  }

  getRiskScores(admissionIds): Observable<RiskScore>{
    let params: URLSearchParams = new URLSearchParams();
    params.set('admissionIDs', '[' + admissionIds.join() + ']');

    let scores$ = this.http
      .get(`${this.riskScoreUri}`, {headers: this.getHeaders(), search: params})
      .map(mapScores)
      .catch(handleError);
    return scores$;
  }

  private getHeaders(){
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    return headers;
  }
}

function mapScores(response: Response): number[]{
  let scores = response.json().map(toRiskScore);
  return scores;
}

function toRiskScore(response: any): RiskScore{
   let riskScore = <RiskScore>({
      hadm_id: response.admissionID,
      riskscore: response.readmissionRisk
   });
   return riskScore;
}

function mapPatients(response: Response): Patient[]{
  let patients = response.json().processedPatients.map(toPatient);
  //console.log(patients);
  return patients;
}

function handleError (error: any) {
  // log error
  let errorMsg = error.message;
  console.error(errorMsg);

  // throw an application level error
  return Observable.throw(errorMsg);
}

function toPatient(response:any): Patient{
  let patient = <Patient>({
    subject_id: response.subject_id,
    hadm_id: response.hadm_id,
    admission_type: response.admission_type,
    diagnosis: response.diagnosis,
    ethnicity: response.ethnicity,
    insurance: response.insurance,
    language: response.language,
    marital_status: response.marital_status,
    avg_drg_severity: response.avg_drg_severity,
    avg_drg_mortality: response.avg_drg_mortality,
    age: response.age,
    gender: response.gender,
    admittime: response.admittime,
    dischtime: response.dischtime,
    dob: response.dob
  });
  //console.log('Parsed patient:', patient);
  return patient;
}
