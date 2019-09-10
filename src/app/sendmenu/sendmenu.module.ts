import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SendmenuPage } from './sendmenu.page';
import { SendoroPage } from '../sendoro/sendoro.page';

const routes: Routes = [
  {
    path: '',
    component: SendmenuPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  
    RouterModule.forChild(routes)
  ],
  declarations: [SendmenuPage]
})
export class SendmenuPageModule {}
