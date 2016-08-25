import { Component, OnInit } from '@angular/core';
import { PatientService } from '../services';
import { Patient } from "../models/patient";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'pk-readmission-risk-results',
  templateUrl: 'readmission-risk-results.component.html',
  styleUrls: ['readmission-risk-results.css'],
  providers: [PatientService]
})
export class ReadmissionRiskResultsComponent implements OnInit {

  private riskscore: string = "0";

  private patient: Patient;
  private errorMessage: string;
  private admissionId: number;

  constructor(private patientService: PatientService, private router: Router, private activatedRouter: ActivatedRoute) {
      this.admissionId = this.activatedRouter.snapshot.params['admissionId'];
  }


    ngOnInit() {
      this.patientService.getAllPatients()
        .subscribe(
          p => {
              this.patient = p.find(patient => patient.hadm_id == this.admissionId);
          },
          e => this.errorMessage = e
        );
        /*  this.patientService.getRiskScores([165315]).subscribe(
            rs => {},
            e => this.errorMessage = e
          );*/
    }

  backToPatientSelect(){
    this.router.navigate(['']);
  }

}
