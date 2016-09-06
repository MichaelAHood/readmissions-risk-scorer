import {Component, OnInit, ElementRef, Renderer, ViewChild} from '@angular/core';
import { PatientService } from '../services';
import { Patient } from '../models/patient';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { RiskLegendComponent } from '../risk-legend';
import { RadioButtonState } from "@angular/common";

@Component({
  moduleId: module.id,
  selector: 'pk-discharge-population',
  templateUrl: 'discharge-population.component.html',
  directives: [RiskLegendComponent],
  providers: [PatientService, ROUTER_DIRECTIVES]
})
export class DischargePopulationComponent implements OnInit{
  private originalPatients: Array<Patient>;
  private currentPatients: Array<Patient>;
  private displayedPatients: Array<Patient>;
  private columns: Array<string>;
  private errorMessage: string;
  private numberOfPages: Array<number>;
  private paginationsButtonsDisplayed: Array<number>;
  private numberOfPageButtons: number;
  private itemsPerPage: number;
  private currentPage: number;
  private riskScoreSortingDirection: string;
  private ageSliderValue: number;
  private filterByAdmissionDateFrom: string;
  private filterByAdmissionDateTo: string;

  constructor(private patientService: PatientService, private router: Router, private element: ElementRef, private renderer: Renderer) {
    this.originalPatients = [];
    this.currentPatients = [];
    this.displayedPatients = [];
    this.numberOfPages = [];
    this.paginationsButtonsDisplayed = [];
    this.riskScoreSortingDirection = '';
    this.columns = ['Patient ID', 'Age', 'Gender', 'Marital Status', 'Language', 'Admission Date', 'Admission Type', 'Discharge Date', 'Risk Score', 'Details'];
    this.ageSliderValue = 100;
    this.numberOfPageButtons = 5;
    this.itemsPerPage = 10;
    this.currentPage = 1;
  }

  ngOnInit() {
    this.patientService.getAllPatients()
                      .subscribe(
                        p => {
                            this.currentPatients = p;
                            this.originalPatients = p;


                            for(let i = 0; i < this.itemsPerPage; i++) {
                              this.displayedPatients.push(this.currentPatients[i]);
                            }

                          this.calculatePaginationButtons();
                        },
                        e => this.errorMessage = e
                      );
  }

  goToDetails(patient: Patient){
      this.router.navigate(['/details', patient.hadm_id]);
  }

  sortPatientList(){
    const DESCENDING = 'Dsc';
    const ASCENDING = 'Asc';

     if(this.riskScoreSortingDirection === ''){
       this.riskScoreSortingDirection = DESCENDING;
     }

     if(this.riskScoreSortingDirection === ASCENDING){
        this.currentPatients.sort(sortRiskScoreAsc);
       this.riskScoreSortingDirection = DESCENDING;
      }else {
        this.currentPatients.sort(sortRiskScoreDesc);
        this.riskScoreSortingDirection = ASCENDING;
      }
      this.goToPage(1);
      this.calculatePaginationButtons();
  }


  goToPage(page: number){
    let startingIndex = 0;
    if(page !== 1){
      startingIndex = Math.ceil((page * this.itemsPerPage) - (this.itemsPerPage - 1));
    }

    let endingIndex = (startingIndex + (this.itemsPerPage - 1));

    this.displayedPatients = this.currentPatients.filter(function(value, index){
      if(index >= startingIndex && index <= endingIndex){
        return true;
      }
    });

    let previousActive = this.element.nativeElement.querySelector('.active');
    if(previousActive) {
      this.renderer.setElementClass(previousActive, 'active', false);
    }

    //let currentPageElement = this.element.nativeElement.querySelector('#' + event.srcElement.parentElement.id);
    let currentPageElement = this.element.nativeElement.querySelector('#Page' + page);
    if(!currentPageElement){
      return;
    }
    this.renderer.setElementClass(currentPageElement, 'active', true);

    this.currentPage = page;
  }

  previousPage(){
    let previousPage = (this.currentPage - 1);
    if(previousPage < 1){
      return;
    }
    this.currentPage = previousPage;

    if(this.paginationsButtonsDisplayed.indexOf(this.currentPage) === -1){
      this.paginationsButtonsDisplayed.pop();
      this.paginationsButtonsDisplayed.unshift(this.currentPage);
    }

    this.goToPage(this.currentPage);
  }

  isPreviousDisabled(){
    if(this.currentPage === 1){
      return true;
    }
    return false;
  }

  nextPage(){
    let nextPage = (this.currentPage + 1);
    if(nextPage > this.numberOfPages.length){
      return;
    }
    this.currentPage = nextPage;

    if(this.paginationsButtonsDisplayed.indexOf(this.currentPage) === -1) {
      this.paginationsButtonsDisplayed.shift();
      this.paginationsButtonsDisplayed.push(this.currentPage);
    }

    this.goToPage(this.currentPage);
  }

  isNextDisabled(){
    if(this.currentPage === this.numberOfPages.length){
      return true;
    }
    return false;
  }

  hideDisplayButton(page: number){
    if(this.paginationsButtonsDisplayed.indexOf(page) === -1){
      return true;
    }
    return false;
  }

  filterByAge(age: number){
    this.ageSliderValue = age;
    this.updateFilterDisplay(this.originalPatients.filter(patient => patient.age <= this.ageSliderValue));
  }

  filterByRiskLevel(level: string){
    switch(level){
      case 'low':
        this.updateFilterDisplay(this.originalPatients.filter(patient => patient.riskScore <= 0.25));
        break;
      case 'borderline':
        this.updateFilterDisplay(this.originalPatients.filter(patient => patient.riskScore > 0.25 && patient.riskScore <= 0.50));
        break;
      case 'high':
        this.updateFilterDisplay(this.originalPatients.filter(patient => patient.riskScore > 0.50 && patient.riskScore <= 0.75));
        break;
      case 'critical':
        this.updateFilterDisplay(this.originalPatients.filter(patient => patient.riskScore > 0.75));
        break;
      default:
        this.updateFilterDisplay(this.originalPatients);
        break;
    }
  }

  filterAdmissionDateFrom(dateString: string){
    this.updateFilterDisplay(this.originalPatients.filter(patient => new Date(patient.dischtime.toString()) >= new Date(dateString)));
  }

  filterAdmissionDateTo(dateString: string){
    this.updateFilterDisplay(this.originalPatients.filter(patient => new Date(patient.dischtime.toString()) <= new Date(dateString)));
  }

  calculatePaginationButtons(){
    this.currentPage = 1;
    this.numberOfPages = [];
    for(let i = 0; i < (this.currentPatients.length/this.itemsPerPage); i++){
      this.numberOfPages.push(i + 1);
    }

    this.paginationsButtonsDisplayed = [];
    for(let i = 0; i < this.numberOfPageButtons; i++){
      if(i < this.numberOfPageButtons) {
        this.paginationsButtonsDisplayed.push(i + 1);
      }
    }
  }

  clearFilters() {
    this.currentPatients = this.originalPatients;
    this.displayedPatients = this.currentPatients.slice(0, this.itemsPerPage);
    this.ageSliderValue = 50;

    this.calculatePaginationButtons();
  }

  updateFilterDisplay(filteredPatients: Array<Patient>){
    this.currentPatients = filteredPatients;
    this.displayedPatients = this.currentPatients.slice(0, this.itemsPerPage);
    this.calculatePaginationButtons();
    this.goToPage(1);
  }
}

function sortRiskScoreDesc(lhs, rhs){
  return rhs.riskScore - lhs.riskScore;
}
function sortRiskScoreAsc(lhs, rhs){
  return lhs.riskScore - rhs.riskScore;
}
