import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PostProvider } from 'providers/postprovider';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { unwrapResolvedMetadata } from '@angular/compiler';

@Component({
  selector: 'app-transferfund',
  templateUrl: './transferfund.page.html',
  styleUrls: ['./transferfund.page.scss'],
})
export class TransferfundPage implements OnInit {
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
  constructor(private modalCtrl: ModalController,private postPvdr: PostProvider,private router: Router,private loadingctrl: LoadingController,private alertController: AlertController, private storages: Storage) { }
  
  ngOnInit() {
    this.storages.get('msrno').then((val) => {
      this.s_msrno = val;
    });
    this.storages.get('username').then((val) => {
      this.s_uname = val;
      this.getfunds();
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
  
  
  
  cleartext(){
    this.username = "";
    this.fname = "";
    this.mobile = "";
    this.password = "";
    this.amount = "";
  }
  
  
  hideLoader(data) {
    setTimeout(() => {
      this.loadingctrl.dismiss();
      if (data == null || data == "" ) {
        this.presentAlert(this.err);
        this.cleartext();
        this.dismiss();
      }else{
        this.presentAlert(this.err);
        this.cleartext();
        this.dismiss();
      }
    }, 2000);
  }
  async createdProcess(){
    
    if(this.username =="" || this.fname =="" || this.amount =="" || this.mobile =="" || this.password ==""){
      this.presentAlert("Please fill in all the fields");
    }
    
    else{
      
      
      
      this.showLoader();
      return new Promise( resolve => {
        let body = {
          aksi: 'transfer',
          msrno: this.s_msrno,
          username: this.s_uname,
          uname : this.username,
          fname    :this.fname,
          amt   :this.amount,
          mobile   :this.mobile,
          pass     :this.password
          
        };
        this.postPvdr.postData(body, 'process-api.php').subscribe(async data=>{
          this.err = data['prompt']['message'];
          console.log(data);
          
          if (this.err == null ) {
            this.hideLoader('');
          }else{
            this.hideLoader(this.err);
          }
          
        });
        
      });
    }
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
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
    const msrno = '/tabs/tab1';
    this.router.navigateByUrl(msrno);
  }
  
  gotoPass(){
    this.dismiss();
    const msrno = '/transac-pass1';
    this.router.navigateByUrl(msrno);
  }
  
}
