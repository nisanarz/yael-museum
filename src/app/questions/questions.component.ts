import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Router} from '@angular/router';
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

  constructor(private db: AngularFireDatabase,
    private router: Router) { 
    this.questions = this.db.list('questions').valueChanges();
    this.results = this.db.list('results')
  }

  ngOnInit(): void {
  }

  saveResult(){
    if (this.selection == null){
      alert("בבקשה בחר/י באחת התשובות");
      return;
    }
    this.results.valueChanges().subscribe(val => {
      var tmp: any= val[0];
      tmp[this.selection] += 1
      this.db.list('results').update('0', tmp); 
      this.router.navigate(['/summary']);
    })
  }

}
