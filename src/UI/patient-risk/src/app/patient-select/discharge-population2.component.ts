import {Component, OnInit } from '@angular/core';
import { PatientService } from '../services';
import { Patient } from '../models/patient';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'pk-discharge-population2',
  templateUrl: 'discharge-population2.component.html',
  providers: [PatientService, ROUTER_DIRECTIVES]
})
export class DischargePopulation2Component implements OnInit {
  private allPatients: Array<Patient>;
  private displayedPatients: Array<Patient>;
  private columns: Array<string>;
  private errorMessage: string;
  private numberOfPages: Array<number>;
  private itemsPerPage: number = 10;

  constructor(private patientService: PatientService, private router: Router) {
    this.allPatients = [];
    this.displayedPatients = [];
    this.numberOfPages = [];
    this.columns = ['Name', 'Age', 'DOB', 'Gender', 'Marital Status', 'Language', 'Admission Date', 'Admission Type', 'Discharge Date', 'Details'];

  }

  ngOnInit() {
    this.patientService.getAllPatients()
                      .subscribe(
                        p => {
                            this.allPatients = p;
                            for(let i = 0; i < (this.allPatients.length/this.itemsPerPage); i++){
                              this.numberOfPages.push(i + 1);
                            }
                            for(let i = 0; i < this.itemsPerPage; i++){
                              this.displayedPatients.push(this.allPatients[i]);
                            }
                        },
                        e => this.errorMessage = e
                      );
  }

  goToDetails(patient){
      this.router.navigate(['/details', patient.hadm_id]);
  }

  goToPage(page){

    let startingIndex = 0;
    if(page !== 1){
      startingIndex = Math.ceil((page * this.itemsPerPage) - (this.itemsPerPage - 1));
    }

    let endingIndex = (startingIndex + (this.itemsPerPage - 1));
    
    this.displayedPatients = this.allPatients.filter(function(value, index){
      if(index >= startingIndex && index <= endingIndex){
        return true;
      }
    });
  }
}
