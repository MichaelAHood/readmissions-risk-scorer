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
  private numberOfPageButtons: number = 5;
  private itemsPerPage: number = 10;
  private currentPage: number = 1;

  constructor(private patientService: PatientService, private router: Router, private element: ElementRef, private renderer: Renderer) {
    this.allPatients = [];
    this.displayedPatients = [];
    this.numberOfPages = [];
    this.paginationsButtonsDisplayed = [];
    this.columns = ['Name', 'Age', 'DOB', 'Gender', 'Marital Status', 'Language', 'Admission Date', 'Admission Type', 'Discharge Date', 'Risk Score', 'Details'];
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
                               this.paginationsButtonsDisplayed.push(i + 1);
                            }
                        },
                        e => this.errorMessage = e
                      );
  }

  goToDetails(patient){
      this.router.navigate(['/details', patient.hadm_id]);
  }

  goToPage(page, event){
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

  previousPage(event){
    let previousPage = --this.currentPage;
    if(previousPage < 1){
      return;
    }
    this.currentPage = previousPage;

    if(this.paginationsButtonsDisplayed.indexOf(this.currentPage) === -1){
      this.paginationsButtonsDisplayed.pop();
      this.paginationsButtonsDisplayed.unshift(this.currentPage);
    }

    this.goToPage(this.currentPage, event);
  }

  isPreviousDisabled(){
    if(this.currentPage === 1){
      return true;
    }
    return false;
  }

  nextPage(event){
    let nextPage = ++this.currentPage;
    if(nextPage > this.numberOfPages.length){
      return;
    }
    this.currentPage = nextPage;

    if(this.paginationsButtonsDisplayed.indexOf(this.currentPage) === -1) {
      this.paginationsButtonsDisplayed.shift();
      this.paginationsButtonsDisplayed.push(this.currentPage);
    }

    this.goToPage(this.currentPage, event);
  }

  isNextDisabled(){
    if(this.currentPage === this.numberOfPages.length){
      return true;
    }
    return false;
  }

  hideDisplayButton(page){
    if(this.paginationsButtonsDisplayed.indexOf(page) === -1){
      return true;
    }
    return false;
  }

}
