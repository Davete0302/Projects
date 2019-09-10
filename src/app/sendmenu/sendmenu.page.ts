import { Component, OnInit } from '@angular/core';

import { ModalController, PopoverController, NavController } from '@ionic/angular';
import { SendoroPage } from '../sendoro/sendoro.page';

@Component({
  selector: 'app-sendmenu',
  templateUrl: './sendmenu.page.html',
  styleUrls: ['./sendmenu.page.scss'],
})
export class SendmenuPage implements OnInit {

  constructor(private modalctrl: ModalController , private navctrl: NavController) { }

  ngOnInit() {
  }

  async openSend() {
    const modal = await this.modalctrl.create({
      component: SendoroPage,
      componentProps: {
        'walletaddress': 'empty',
        'method': '0',
     
      }
    });

    modal.onDidDismiss().then((data) => {
      this.ngOnInit();
    });

    return await modal.present();
  }

  async openQR() {
    const modal = await this.modalctrl.create({
      component: SendoroPage,
      componentProps: {
        'walletaddress': 'empty',
        'method': '1',
     
      }
    });

    modal.onDidDismiss().then((data) => {
      this.ngOnInit();
    });

    return await modal.present();
  }
}
