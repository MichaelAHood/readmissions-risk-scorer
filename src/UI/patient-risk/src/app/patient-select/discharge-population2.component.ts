import { Component, OnInit, ElementRef, Renderer } from '@angular/core';
import { PatientService } from '../services';
import { Patient } from '../models/patient';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'pk-discharge-population2',
  templateUrl: 'discharge-population2.component.html',
  providers: [PatientService, ROUTER_DIRECTIVES]
})
export class DischargePopulation2Component implements OnInit{
  private allPatients: Array<Patient>;
  private displayedPatients: Array<Patient>;
  private columns: Array<string>;
  private errorMessage: string;
  private numberOfPages: Array<number>;
  private paginationsButtonsDisplayed: Array<number>;
  private originalButtonsDisplayed: Array<number>;
  private numberOfPageButtons: number = 5;
  private itemsPerPage: number = 10;
  private currentPage: number = 1;
  private riskScoreSortingDirection: string;
  constructor(private patientService: PatientService, private router: Router, private element: ElementRef, private renderer: Renderer) {
    this.allPatients = [];
    this.displayedPatients = [];
    this.numberOfPages = [];
    this.paginationsButtonsDisplayed = [];
    this.riskScoreSortingDirection = '';
    this.columns = ['Patient ID', 'Age', 'Gender', 'Marital Status', 'Language', 'Admission Date', 'Admission Type', 'Discharge Date', 'Risk Score', 'Details'];
    this.originalButtonsDisplayed = [];
  }

  ngOnInit() {
    this.patientService.getAllPatients()
                      .subscribe(
                        p => {
                            this.allPatients = p;
                            for(let i = 0; i < (this.allPatients.length/this.itemsPerPage); i++){
                              this.numberOfPages.push(i + 1);
                            }

                            for(let i = 0; i < this.itemsPerPage; i++) {
                              this.displayedPatients.push(this.allPatients[i]);
                            }

                            for(let i = 0; i < this.numberOfPageButtons; i++){
                               if(i < this.numberOfPageButtons) {
                                 this.paginationsButtonsDisplayed.push(i + 1);
                               }
                            }
                            this.originalButtonsDisplayed = this.paginationsButtonsDisplayed.slice();
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
        this.allPatients.sort(sortRiskScoreAsc);
       this.riskScoreSortingDirection = DESCENDING;
      }else {
        this.allPatients.sort(sortRiskScoreDesc);
        this.riskScoreSortingDirection = ASCENDING;
      }
      this.goToPage(1);
      this.resetPagination();
  }
  resetPagination(){
    this.paginationsButtonsDisplayed = this.originalButtonsDisplayed.slice();
  }

  goToPage(page: number){
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

    let previousActive = this.element.nativeElement.querySelector('.active');
    if(previousActive) {
      this.renderer.setElementClass(previousActive, 'active', false);
    }

    //let currentPageElement = this.element.nativeElement.querySelector('#' + event.srcElement.parentElement.id);
    let currentPageElement = this.element.nativeElement.querySelector('#Page' + page);
    this.renderer.setElementClass(currentPageElement, 'active', true);

    this.currentPage = page;
  }

  previousPage(){
    let previousPage = --this.currentPage;
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
    let nextPage = ++this.currentPage;
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
}

function sortRiskScoreDesc(lhs, rhs){
  return rhs.riskScore - lhs.riskScore;
}
function sortRiskScoreAsc(lhs, rhs){
  return lhs.riskScore - rhs.riskScore;
}
