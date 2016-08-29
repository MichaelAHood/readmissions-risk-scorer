/**
 * Created by prokarma on 8/23/2016.
 */
export class Patient{
  subject_id: number;
  hadm_id: number;
  admission_type: string;
  diagnosis: string;
  ethnicity: string;
  insurance: string;
  language: string;
  marital_status: string;
  avg_drg_severity: number;
  avg_drg_mortality: number;
  age: number;
  gender: string;
  admittime: Date;
  dischtime: Date;
  dob: Date;
}
