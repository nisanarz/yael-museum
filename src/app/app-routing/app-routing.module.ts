import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from '../landing/landing.component';
import { QuestionsComponent } from '../questions/questions.component';
import { SummaryComponent } from '../summary/summary.component';


const routes: Routes = [
  {
      path: 'landing/:id',
      component: LandingComponent,
  },
  {
    path: 'questions/:id',
    component: QuestionsComponent
  },
  {
    path: 'summary/:id',
    component: SummaryComponent
  },
  {
    path: '',
    component: LandingComponent
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

