import { Component } from '@angular/core';
import { HeaderComponent } from './header';
import { PatientSelectComponent } from './patient-select';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  directives: [HeaderComponent, PatientSelectComponent]
})
export class AppComponent {
}
