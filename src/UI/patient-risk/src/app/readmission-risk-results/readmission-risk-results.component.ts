import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'pk-readmission-risk-results',
  templateUrl: 'readmission-risk-results.component.html',
  styleUrls: ['readmission-risk-results.css']
})
export class ReadmissionRiskResultsComponent implements OnInit {

  public comorbiditySeverity:string = "0";
  public comorbidityMorality:string = "0";
  public age:string = "0";
  public riskscore:string = "0";

  constructor() { }

  ngOnInit() {
  }

}
