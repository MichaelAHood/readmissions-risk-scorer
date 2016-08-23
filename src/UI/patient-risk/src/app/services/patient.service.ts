import { Injectable } from '@angular/core';
import { Http, Response, Headers} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Patient } from '../models';

@Injectable()
export class PatientService {

  private uri = 'http://patient-risk-api.52.204.218.231.nip.io/api/processed-patients';

  constructor(private http: Http) { }

  getAll(): Observable<Patient[]>{
    let patients$ = this.http
      .get(`${this.uri}`, {headers: this.getHeaders()})
      .map(mapPatients)
      .catch(handleError);
    return patients$;
  }

  private getHeaders(){
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    return headers;
  }
}

function mapPatients(response: Response): Patient[]{
  let patients = response.json().processedPatients.map(toPatient);
  console.log(patients);
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
    ethnicity: response.ethnicity,
    insurance: response.insurance,
    language: response.language,
    marital_status: response.marital_status,
    avg_drg_severity: response.avg_drg_severity,
    avg_drg_mortality: response.avg_drg_mortality,
    age: response.age,
    gender: response.gender
  });
  //console.log('Parsed patient:', patient);
  return patient;
}
