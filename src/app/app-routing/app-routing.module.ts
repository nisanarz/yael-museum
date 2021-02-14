import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from '../landing/landing.component';
import { QuestionsComponent } from '../questions/questions.component';
import { SummaryComponent } from '../summary/summary.component';


const routes: Routes = [
  {
      path: '',
      component: LandingComponent,
  },
  {
    path: 'questions',
    component: QuestionsComponent
  },
  {
    path: 'summary',
    component: SummaryComponent
  }
];

@NgModule({
  imports: [
      RouterModule.forRoot(routes)
  ],
  exports: [
      RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }

