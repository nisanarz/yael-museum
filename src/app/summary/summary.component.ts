import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, Color, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { ActivatedRoute} from '@angular/router';
import 'chartjs-plugin-labels';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  results:any;
  questionId = 0;
  questions: any;
  questionText = '';
  isDataAvailable:boolean = false;

  public pieChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      labels: {
        fontColor: 'white'
      }
    }
  };
  public pieChartLabels: Label[] = ['תשובה 1', 'תשובה 2', 'תשובה3', 'תשובה 4'];
  public pieChartData: SingleDataSet = [30, 50, 20];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public pieChartColors: Color[] = [
    { 
      backgroundColor:["#1b2754", "#255f96", "#d8504a", "#b0211b", "#faf8ed"] 
    }
  ]

  constructor(private db: AngularFireDatabase, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.questionId = +params['id']; // (+) converts string 'id' to a number

      this.db.list('results').valueChanges().subscribe(results => {
        this.results = results[this.questionId];
        this.db.list('questions').valueChanges().subscribe(questions => {
          this.questions = questions[this.questionId];
          this.questionText = this.questions['question'];
          this.pieChartLabels = this.questions['answers'];
          this.isDataAvailable = true;
        });
        monkeyPatchChartJsTooltip();
        monkeyPatchChartJsLegend();
        
      });

      
      
   });
    
   }

  ngOnInit(): void {
  }

}
