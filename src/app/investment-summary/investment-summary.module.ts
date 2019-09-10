import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InvestmentSummaryPage } from './investment-summary.page';
import { ExpandableComponent } from "../components/expandable/expandable.component";

const routes: Routes = [
  {
    path: '',
    component: InvestmentSummaryPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [InvestmentSummaryPage,ExpandableComponent]
})
export class InvestmentSummaryPageModule {}
