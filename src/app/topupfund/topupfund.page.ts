import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import {Router } from '@angular/router';
import { PostProvider } from 'providers/postprovider';
import { LoadingController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-topupfund',
  templateUrl: './topupfund.page.html',
  styleUrls: ['./topupfund.page.scss'],
})
export class TopupfundPage implements OnInit {

  constructor(private modalCtrl: ModalController,private postPvdr: PostProvider,private router: Router,private loadingctrl: LoadingController,private alertController: AlertController, private storages: Storage) { }
  name_customer: string ="";
  desc_customer: string="";

  username: string="";
  fname: string="";
  amount: string="";
  mobile: string="";
  password: string="";
  err : string="";
  s_msrno : string = "";
  s_uname: string = "";
  availablefunds: any;


  private loading;
  ngOnInit() {
    this.storages.get('msrno').then((val) => {
      this.s_msrno = val;
      });
      this.storages.get('username').then((val) => {
        this.s_uname = val;
        this.getfunds();
        });
  }

  async getfunds(){ // register method
    return new Promise(resolve => {
      let body = {
        aksi: 'getfunds',
        msrno: this.s_msrno,
        uname: this.s_uname
      };
      this.postPvdr.postData(body, 'process.php').subscribe(async data => {
        this.availablefunds = data['data']['funds'];
      });
    });
  }

  async presentAlert(message) {
    const alert = await this.alertController.create({
      header: 'Notice from Admin',
      message: message,
      buttons: ['OK'],
      cssClass: "toaster",
    });
    await alert.present();
  }


  showLoader() {
    this.loading = this.loadingctrl.create({
    message: 'Sending...'
    }).then((res) => {
      res.present();
      
      res.onDidDismiss().then((dis) => {
      });
    });
  
  }
  
  hideLoader(data) {
    setTimeout(() => {
      this.loadingctrl.dismiss();
      if (data == null) {
        this.cleartext();
      }else{
        this.presentAlert(this.err);
      }
    }, 2000);
  }


  cleartext(){
    this.username = "";
    this.fname = "";
    this.username = "";
    this.mobile = "";
    this.password = "";
    this.amount = "";
  }
  
  async createdProcess(){

    if(this.username =="" || this.fname =="" || this.amount =="" || this.mobile =="" || this.password ==""){
      this.presentAlert("Please fill in all the fields");
      }else{
    this.showLoader();
    return new Promise( resolve => {
      let body = {
        aksi: 'topup',
        msrno: this.s_msrno,
        username: this.s_uname,
      /*   name_customer : this.name_customer,
        desc_customer : this.desc_customer */

        uname : this.username,
        fname    :this.fname,
        amount   :this.amount,
        mobile   :this.mobile,
        pass     :this.password

      };
      this.postPvdr.postData(body, 'process-api.php').subscribe(async data=>{
        this.err = data['prompt']['message'];
        console.log(data);
       
        if (this.err == null) {
          this.hideLoader('');
        }else{
          this.hideLoader(this.err);
        }
     
      });

    });
  }
  }

  
  gotoPass(){
    this.dismiss();
  const msrno = '/transac-pass';
        this.router.navigateByUrl(msrno);
  }
  
     
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
    const msrno = '/tabs/tab1';
        this.router.navigateByUrl(msrno);
  }
}
