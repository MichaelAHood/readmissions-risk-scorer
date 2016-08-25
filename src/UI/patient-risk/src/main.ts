import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppComponent, environment } from './app/';
import { disableDeprecatedForms, provideForms } from "@angular/forms"
import {HTTP_PROVIDERS} from "@angular/http";
import {Route, RouterConfig} from "@angular/router";
import {ReadmissionRiskResultsComponent} from "./app/readmission-risk-results/readmission-risk-results.component";
import {provideRouter} from "@angular/router/src/common_router_providers";

if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent, [HTTP_PROVIDERS,
                         disableDeprecatedForms(),
                         provideForms()]);

