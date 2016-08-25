import { Component, OnInit } from '@angular/core';
import { PatientService } from '../services';
import { Patient } from '../models/patient';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'pk-discharge-population2',
  templateUrl: 'discharge-population2.component.html',
  providers: [PatientService, ROUTER_DIRECTIVES]
})
export class DischargePopulation2Component implements OnInit {
  private patients: Array<Patient>;
  private columns: string[];
  private errorMessage: string;

  constructor(private patientService: PatientService) {
    this.patients = [];
    this.columns = ['Name', 'Age', 'Gender', 'Marital Status', 'Language', 'Admission Type', 'Details'];
  }

  ngOnInit() {
    this.patientService.getAllPatients()
                      .subscribe(
                        p => {
                          //random discharges for the day
                          for(let i = 0; i < 20; i++){
                            let randomPatient = p[Math.floor(Math.random() * p.length)];
                            //console.log(randomPatient);
                            this.patients.push(randomPatient);
                          }
                        },
                        e => this.errorMessage = e
                      );
  }
}
