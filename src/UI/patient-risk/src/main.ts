import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppComponent, environment } from './app/';
// import { CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass, NgIf } from '@angular/common';
// import { PAGINATION_DIRECTIVES } from 'ng2-bootstrap';
// import { NG_TABLE_DIRECTIVES } from 'ng2-table';
// import { TableData } from './table-data';

if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent);


