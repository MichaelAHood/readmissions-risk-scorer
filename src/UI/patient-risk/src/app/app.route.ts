import { ReadmissionRiskResultsComponent } from './readmission-risk-results/readmission-risk-results.component';
import { RouterConfig } from '@angular/router';
import { provideRouter } from '@angular/router/src/common_router_providers';
import {PatientSelectComponent} from "./patient-select/patient-select.component";

const routes: RouterConfig = [
  { path: '', component: PatientSelectComponent },
  { path: 'details', component: ReadmissionRiskResultsComponent }
];

export const APP_ROUTE_PROVIDER = [
  provideRouter(routes, {})
];


