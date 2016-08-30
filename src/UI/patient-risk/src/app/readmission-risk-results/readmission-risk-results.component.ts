import { Component, OnInit } from '@angular/core';
import { PatientService } from '../services';
import { Patient } from "../models/patient";
import { Router, ActivatedRoute } from '@angular/router';
import { CHART_DIRECTIVES } from 'angular2-highcharts';

@Component({
  moduleId: module.id,
  selector: 'pk-readmission-risk-results',
  templateUrl: 'readmission-risk-results.component.html',
  styleUrls: ['readmission-risk-results.css'],
  providers: [PatientService],
  directives: [CHART_DIRECTIVES]
})
export class ReadmissionRiskResultsComponent implements OnInit {

  private riskscore: string = 'Calculating...';
  private patient: Patient;
  private errorMessage: string;
  private admissionId: number;
  private chart1options: HighchartsOptions;
  private chart2options: HighchartsOptions;
  private chart3options: HighchartsOptions;

  constructor(private patientService: PatientService, private router: Router, private activatedRouter: ActivatedRoute) {
      this.admissionId = this.activatedRouter.snapshot.params['admissionId'];

      this.chart1options = {
        chart: { type: 'spline', width: 580, height: 230 },
        title: { text : null },
        legend: { enabled: false },
        xAxis: {
          title: { text: 'Range'},
          categories: ['&lt;0.5', '0.5 - &lt;1.0', '1.0 - &lt;1.5', '1.5 - &lt;2.0', '2.0 - &lt;2.5', '2.5 - &lt;3.0', '3.0 - &lt;3.5', '3.5 - &lt;4.0', '4.0 - &lt;4.5', '4.5 - 5.0']
        },
        yAxis: {
          title: { text: 'Patient Count'}
        },
        series: [{name: 'Value',
          data: [20,40,60,80,90,95,
            {
              y: 80,
              marker: {symbol: 'url(/app/readmission-risk-results/marker.png)'}
            },
          40,10,5] }]
      };

    this.chart2options = {
      chart: { type: 'spline', width: 580, height: 230 },
      title: { text : null },
      legend: { enabled: false },
      xAxis: {
        title: { text: 'Range'},
        categories: ['&lt;0.5', '0.5 - &lt;1.0', '1.0 - &lt;1.5', '1.5 - &lt;2.0', '2.0 - &lt;2.5', '2.5 - &lt;3.0', '3.0 - &lt;3.5', '3.5 - &lt;4.0', '4.0 - &lt;4.5', '4.5 - 5.0']
      },
      yAxis: {
        title: { text: 'Patient Count'}
      },
      series: [{name: 'Value',
        data: [15,35,45,
          {
            y: 55,
            marker: {symbol: 'url(/app/readmission-risk-results/marker.png)'}
          },
        60,80,90,30,7,2] }]
    };

    this.chart3options = {
      chart: { type: 'spline', width: 580, height: 230 },
      title: { text : null },
      legend: { enabled: false },
      xAxis: {
        title: { text: 'Range'},
        categories: ['0-10', '11-20', '21-30', '31-40', '41-50', '51-60', '61-70', '71-80', '81-90', '>90']
      },
      yAxis: {
        title: { text: 'Patient Count'}
      },
      series: [{name: 'Value',
        data: [20,40,60,80,
          {
            y: 90,
            marker: {symbol: 'url(/app/readmission-risk-results/marker.png)'}
          },
        95,80,40,10,5] }]
    };

  }

    ngOnInit() {
      this.patientService.getAllPatients()
        .subscribe(
          p => {
              this.patient = p.find(patient => patient.hadm_id == this.admissionId);
          },
          e => this.errorMessage = e
        );
          this.patientService.getRiskScores([this.admissionId]).subscribe(
            rs => {
                this.riskscore = rs[0].riskscore.toString();
            },
            e => this.errorMessage = e
          );
    }

  backToPatientSelect(){
    this.router.navigate(['']);
  }

}
