import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  questionId = 0;

  constructor(private router: Router, private route: ActivatedRoute) { 
    this.route.params.subscribe(params => {
      this.questionId = +params['id']; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
   });
  }

  ngOnInit(): void {
  }

  startQuiz(){
    this.router.navigate(['/questions', this.questionId]);
  }
}
