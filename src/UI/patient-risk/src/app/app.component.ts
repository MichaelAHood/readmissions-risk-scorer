import { Component } from '@angular/core';
import { HeaderComponent } from './header';
import { PatientSelectComponent } from './patient-select';
import { ReadmissionRiskResultsComponent} from './readmission-risk-results';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  directives: [HeaderComponent, PatientSelectComponent, ReadmissionRiskResultsComponent]
})
export class AppComponent {
}
