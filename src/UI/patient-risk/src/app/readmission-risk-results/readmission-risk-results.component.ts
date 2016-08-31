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
  private comorbidMortalityOptions: HighchartsOptions;
  private comorbidSeverityOptions: HighchartsOptions;
  private ageOptions: HighchartsOptions;
  private marker: string = 'url(/app/readmission-risk-results/marker.png)';

  constructor(private patientService: PatientService, private router: Router, private activatedRouter: ActivatedRoute) {
       this.admissionId = this.activatedRouter.snapshot.params['admissionId'];
       let riskScore = this.activatedRouter.snapshot.params['riskScore'];
       this.riskscore = (Math.floor(riskScore * 100) + '%');
    };

    ngOnInit() {
      this.patientService.getAllPatients()
        .subscribe(
          p => {
              this.patient = p.find(patient => patient.hadm_id == this.admissionId);


            this.patientService.getComorbidsSeverityDistributions()
              .subscribe(
                csd => {
                  let severityData = [
                    { y: csd.OneCount, marker: {symbol: 'circle'}},
                    { y: csd.TwoCount, marker: {symbol: 'circle'}},
                    { y: csd.ThreeCount, marker: {symbol: 'circle'}},
                    { y: csd.FourCount, marker: {symbol: 'circle'}},
                    { y: csd.FiveCount, marker: {symbol: 'circle'}}
                  ];

                  let severity = this.patient.avg_drg_severity;
                  if(severity < 1.0){
                    severityData[0].marker.symbol = this.marker;
                  } else if(severity >= 1.0 && severity < 2.0){
                    severityData[1].marker.symbol = this.marker;
                  } else if(severity >= 2.0 && severity < 3.0){
                    severityData[2].marker.symbol = this.marker;
                  } else if(severity >= 3.0 && severity < 4.0){
                    severityData[3].marker.symbol = this.marker;
                  } else {
                    severityData[4].marker.symbol = this.marker;
                  }

                  this.comorbidSeverityOptions = {
                    chart: { type: 'spline', width: 580, height: 230 },
                    title: { text : null },
                    legend: { enabled: false },
                    xAxis: {
                      title: { text: 'Range'},
                      categories: ['&lt;1.0', '1.0 - &lt;2.0', '2.0 - &lt;3.0', '3.0 - &lt;4.0', '4.0 - 5.0']
                    },
                    yAxis: {
                      title: { text: 'Patient Count'}
                    },
                    series: [
                      {
                        name: 'Patient Count',
                        data: severityData
                      }]
                  };
                },
                e => this.errorMessage = e
              );

            this.patientService.getComorbidsMortalityDistributions()
              .subscribe(
                cmd => {

                  let mortalityData = [
                    { y: cmd.OneCount, marker: {symbol: 'circle'}},
                    { y: cmd.TwoCount, marker: {symbol: 'circle'}},
                    { y: cmd.ThreeCount, marker: {symbol: 'circle'}},
                    { y: cmd.FourCount, marker: {symbol: 'circle'}},
                    { y: cmd.FiveCount, marker: {symbol: 'circle'}}
                  ];

                  let mortality = this.patient.avg_drg_mortality;
                  if(mortality < 1.0){
                    mortalityData[0].marker.symbol = this.marker;
                  } else if(mortality >= 1.0 && mortality < 2.0){
                    mortalityData[1].marker.symbol = this.marker;
                  } else if(mortality >= 2.0 && mortality < 3.0){
                    mortalityData[2].marker.symbol = this.marker;
                  } else if(mortality >= 3.0 && mortality < 4.0){
                    mortalityData[3].marker.symbol = this.marker;
                  } else {
                    mortalityData[4].marker.symbol = this.marker;
                  }

                  this.comorbidMortalityOptions = {
                    chart: { type: 'spline', width: 580, height: 230 },
                    title: { text : null },
                    legend: { enabled: false },
                    xAxis: {
                      title: { text: 'Range'},
                      categories: ['&lt;1.0', '1.0 - &lt;2.0', '2.0 - &lt;3.0', '3.0 - &lt;4.0', '4.0 - 5.0']
                    },
                    yAxis: {
                      title: { text: 'Patient Count'}
                    },
                    series: [
                      {
                        name: 'Patient Count',
                        data: mortalityData
                      }]
                  };
                },
                e => this.errorMessage = e
              );

            this.patientService.getAgeDistributions()
              .subscribe(
                ad => {

                  let ageData = [
                    { y: ad.ACount, marker: {symbol: 'circle'}},
                    { y: ad.BCount, marker: {symbol: 'circle'}},
                    { y: ad.CCount, marker: {symbol: 'circle'}},
                    { y: ad.DCount, marker: {symbol: 'circle'}},
                    { y: ad.ECount, marker: {symbol: 'circle'}},
                    { y: ad.FCount, marker: {symbol: 'circle'}},
                    { y: ad.GCount, marker: {symbol: 'circle'}},
                    { y: ad.HCount, marker: {symbol: 'circle'}},
                    { y: ad.ICount, marker: {symbol: 'circle'}},
                    { y: ad.JCount, marker: {symbol: 'circle'}}
                  ];

                  let age = this.patient.age;
                  if(age < 10){
                    ageData[0].marker.symbol = this.marker;
                  } else if(age > 10 && age <= 20){
                    ageData[1].marker.symbol = this.marker;
                  } else if(age > 20 && age <= 30){
                    ageData[2].marker.symbol = this.marker;
                  } else if(age > 30 && age <= 40){
                    ageData[3].marker.symbol = this.marker;
                  } else if(age > 40 && age <= 50){
                    ageData[4].marker.symbol = this.marker;
                  } else if(age > 50 && age <= 60){
                    ageData[5].marker.symbol = this.marker;
                  } else if(age > 60 && age <= 70){
                    ageData[6].marker.symbol = this.marker;
                  } else if(age > 70 && age <= 80){
                    ageData[7].marker.symbol = this.marker;
                  } else if(age > 80 && age <= 90){
                    ageData[8].marker.symbol = this.marker;
                  } else{
                    ageData[9].marker.symbol = this.marker;
                  }

                  this.ageOptions = {
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
                    series: [
                      {
                        name: 'Patient Count',
                        data: ageData
                      }
                    ]};
                },
                e => this.errorMessage = e
              );

          },
          e => this.errorMessage = e
        );
    };

  getriskScoreStyle() {
    if(this.riskscore == 'Calculating...'){
      return "#5CB85C"; // green
    } else {
      let riskScore = Number(this.riskscore.replace('%', ''));
      if (riskScore <= 25)
      {
        return "#5CB85C"; // green
      }
      else if (riskScore <= 50)
      {
        return "#F7D83D"; // green
      }
      else
      {
        return "#FC4133"; // red
      }
    }
  }

  backToPatientSelect(){
    this.router.navigate(['']);
  };

}
