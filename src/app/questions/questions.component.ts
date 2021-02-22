import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Router, ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  questions: any;
  results: AngularFireList<any>;
  selection=null;
  questionId=0;
  isDataAvailable:boolean = false;

  constructor(private db: AngularFireDatabase,
    private router: Router, private route: ActivatedRoute) { 

      this.route.params.subscribe(params => {
        this.questionId = +params['id']; // (+) converts string 'id' to a number
  
        this.db.list('questions').valueChanges().subscribe(questions => {
          this.questions = questions[this.questionId];
          this.isDataAvailable = true;
        });
        this.results = this.db.list('results')
     });
    
    
  }

  ngOnInit(): void {
  }

  saveResult(){
    if (this.selection == null){
      alert("בבקשה בחר/י באחת התשובות");
      return;
    }
    this.results.valueChanges().subscribe(val => {
      var tmp: any= val[this.questionId];
      tmp[this.selection] += 1
      this.db.list('results').update(this.questionId.toString(), tmp); 
      this.router.navigate(['/summary', this.questionId]);
    })
  }

}
