import { Component, OnInit } from '@angular/core';
import {CORE_DIRECTIVES, NgClass, NgIf} from '@angular/common';
import {FORM_DIRECTIVES} from '@angular/forms/src/directives';
import {PAGINATION_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {NG_TABLE_DIRECTIVES} from 'ng2-table';

import { PatientService } from '../services';
import { Patient } from '../models';
import {ROUTER_DIRECTIVES} from "@angular/router";

@Component({
  moduleId: module.id,
  selector: 'pk-discharge-population',
  templateUrl: 'discharge-population.component.html',
  styleUrls: ["discharge-population.css"],
  directives: [NG_TABLE_DIRECTIVES, PAGINATION_DIRECTIVES, NgClass, NgIf, CORE_DIRECTIVES, FORM_DIRECTIVES],
  providers: [PatientService, ROUTER_DIRECTIVES]
})

export class DischargePopulationComponent implements OnInit {

  private patients: Array<Patient> = [];
  private errorMessage: string;

  public page:number = 1;
  public itemsPerPage:number = 10;
  public maxSize:number = 5;
  public numPages:number = 1;
  public length:number = 0;

  public constructor(private patientService: PatientService) {

  }

  public config:any = {
    paging: true,
    sorting: {
      columns: this.columns
    },
    filterAge: {
      filterString: '',
      columnName: 'age'
    },
    filterAdmissionType: {
      filterString: '',
      columnName: 'admission_type'
    }
  };

  public ngOnInit():void {
    this.patientService.getAllPatients()
                       .subscribe(
                         p => {
                           //random discharges for the day
                           for(let i = 0; i < 20; i++){
                             let randomPatient = p[Math.floor(Math.random() * p.length)];
                             //console.log(randomPatient);
                             this.patients.push(randomPatient);
                           }
                           //this.patients = p;
                           this.length = this.patients.length;
                           this.onChangeTable(this.config);
                         },
                         e => this.errorMessage = e
                       );
  }

  public rows:Array<any> = [];
  public columns:Array<any> = [
    {title: 'Name', name: 'subject_id'},
    {title: 'Age', name: 'age'},
    {title: 'Gender', name: 'gender'},
    {title: 'Marital Status', name: 'marital_status'},
    {title: 'Language', name: 'language'},
    {title: 'Admission Type', name: 'admission_type'}
  ];

  public changePage(page:any, data:Array<Patient> = this.patients):Array<Patient> {
    console.log(page);
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  public changeSort(data:any, config:any):any {
    if (!config.sorting) {
      return data;
    }

    let columns = this.config.sorting.columns || [];
    let columnName:string = void 0;
    let sort:string = void 0;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].sort !== '') {
        columnName = columns[i].name;
        sort = columns[i].sort;
      }
    }

    if (!columnName) {
      return data;
    }

    // simple sorting
    return data.sort((previous:any, current:any) => {
      if (previous[columnName] > current[columnName]) {
        return sort === 'desc' ? -1 : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sort === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }

  public changeFilter(data:any, config:any):any {
    if (!config.filterAge) {
      return data;
    }

    if (!config.filterAdmissionType) {
        return data;
    }

    let filteredData:Array<any> = data.filter((item:any) =>
        item[config.filterAge.columnName].toString().toLowerCase().match(this.config.filterAge.filterString.toLowerCase()) &&
        item[config.filterAdmissionType.columnName].toLowerCase().match(this.config.filterAdmissionType.filterString.toLowerCase())
    );

    return filteredData;
  }

  public onChangeTable(config:any, page:any = {page: this.page, itemsPerPage: this.itemsPerPage}):any {
    if (config.filterAge) {
      Object.assign(this.config.filterAge, config.filterAge);
    }
    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }

    let filteredData = this.changeFilter(this.patients, this.config);
    let sortedData = this.changeSort(filteredData, this.config);
    this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
    this.length = sortedData.length;
  }
}
