import { Component, OnInit } from '@angular/core';
import { DischargePopulation2Component } from './discharge-population2.component';
import { FilterPopulationByComponent } from './filter-population-by.component';
import { ProportionAtRiskComponent } from './proportion-at-risk.component';

@Component({
  moduleId: module.id,
  selector: 'pk-patient-select',
  templateUrl: 'patient-select.component.html',
  directives: [DischargePopulation2Component, FilterPopulationByComponent, ProportionAtRiskComponent]
})
export class PatientSelectComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
