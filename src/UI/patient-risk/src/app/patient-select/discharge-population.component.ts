import { Component, OnInit } from '@angular/core';
import {CORE_DIRECTIVES, NgClass, NgIf} from '@angular/common';
import {FORM_DIRECTIVES} from '@angular/forms/src/directives';
import {PAGINATION_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {NG_TABLE_DIRECTIVES} from 'ng2-table';

import { PatientService } from '../services';
import { Patient } from '../models';

@Component({
  moduleId: module.id,
  selector: 'pk-discharge-population',
  templateUrl: 'discharge-population.component.html',
  directives: [NG_TABLE_DIRECTIVES, PAGINATION_DIRECTIVES, NgClass, NgIf, CORE_DIRECTIVES, FORM_DIRECTIVES],
  providers: [PatientService]
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

  public ngOnInit():void {
    this.patientService.getAllPatients()
                       .subscribe(
                         p => {
                           this.patients = p;
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
    {title: 'Admission Type', name: 'admission_type'}
  ];

  public config:any = {
    paging: true,
    sorting: {columns: this.columns},
    filterPosition: {filterString: '', columnName: 'age'},
    filterStartdate: {filterString: '', columnName: 'admission_type'},
  };

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
    if (!config.filterPosition) {
      return data;
    }

    if (!config.filterStartdate) {
        return data;
    }

    let filteredData:Array<any> = data.filter((item:any) => []
/*        item[config.filterPosition.columnName].match(this.config.filterPosition.filterString) &&
        item[config.filterStartdate.columnName].match(this.config.filterStartdate.filterString)*/
    );

    return filteredData;
  }

  public onChangeTable(config:any, page:any = {page: this.page, itemsPerPage: this.itemsPerPage}):any {
    if (config.filterPosition) {
      Object.assign(this.config.filterPosition, config.filterPosition);
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
