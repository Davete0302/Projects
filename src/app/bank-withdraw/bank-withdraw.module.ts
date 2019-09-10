import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BankWithdrawPage } from './bank-withdraw.page';

const routes: Routes = [
  {
    path: '',
    component: BankWithdrawPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BankWithdrawPage]
})
export class BankWithdrawPageModule {}
