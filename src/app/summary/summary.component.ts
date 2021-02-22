import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, Color, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { ActivatedRoute} from '@angular/router';
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
  isDataAvailable:boolean = false;

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = ['תשובה 1', 'תשובה 2', 'תשובה3', 'תשובה 4'];
  public pieChartData: SingleDataSet = [30, 50, 20];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public pieChartColors: Color[] = [
    { 
      backgroundColor:["#FF7360", "#6FC8CE", "#FAFFF2", "#FFFCC4", "#B9E8E0"] 
    }
  ]

  constructor(private db: AngularFireDatabase, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.questionId = +params['id']; // (+) converts string 'id' to a number

      this.db.list('results').valueChanges().subscribe(results => {
        this.results = results[this.questionId];
        console.log(this.results)
        this.db.list('questions').valueChanges().subscribe(questions => {
          this.questions = questions[this.questionId];
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
