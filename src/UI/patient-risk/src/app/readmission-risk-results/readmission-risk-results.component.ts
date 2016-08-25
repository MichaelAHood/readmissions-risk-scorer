import { Component, OnInit } from '@angular/core';
import { PatientService } from '../services';

@Component({
  moduleId: module.id,
  selector: 'pk-readmission-risk-results',
  templateUrl: 'readmission-risk-results.component.html',
  styleUrls: ['readmission-risk-results.css'],
  providers: [PatientService]
})
export class ReadmissionRiskResultsComponent implements OnInit {

  private comorbiditySeverity: string = "0";
  private comorbidityMorality: string = "0";
  private age: string = "0";
  private riskscore: string = "0";
  private errorMessage: string;


  constructor(private patientService: PatientService) { }

  ngOnInit() {
  /*  this.patientService.getRiskScores([165315]).subscribe(
      rs => {},
      e => this.errorMessage = e
    );*/
  }

}
