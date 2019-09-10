import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CashoutinfoPage } from './cashoutinfo.page';

const routes: Routes = [
  {
    path: '',
    component: CashoutinfoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CashoutinfoPage]
})
export class CashoutinfoPageModule {}
