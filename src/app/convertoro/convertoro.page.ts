import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';
import { PostProvider } from 'providers/postprovider';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-convertoro',
  templateUrl: './convertoro.page.html',
  styleUrls: ['./convertoro.page.scss'],
})
export class ConvertoroPage implements OnInit {
  
  constructor(private modalCtrl: ModalController, private postprovider: PostProvider,
    private storage: Storage, private loadCtrl: LoadingController, private alertcontroller: AlertController) { }
    private loading;
    availablefunds: any;
    msrno: any;
    username: any;
    convert: any;
    amount: any;
    display: any;
    rate: any;
    response: any;
    message: any;
    pass: any;
    ngOnInit() {
      try {
        this.storage.get('msrno').then((val) => {
          this.msrno = val;
          this.storage.get('username').then((val) => {
            this.username = val;
            this.getfunds();
          });
        });
      } catch (error) {
        
      }
      this.getrate();
    }
    
    async getfunds(){ // register method
      return new Promise(resolve => {
        let body = {
          aksi: 'getfunds',
          msrno: this.msrno,
          uname: this.username
        };
        this.postprovider.postData(body, 'process.php').subscribe(async data => {
          this.availablefunds = data['data']['funds'];
        });
      });
    }
    
    async getrate(){ // oro rate get data method
      return new Promise(resolve => {
        let body = {
          aksi: 'getrate',
        };
        this.postprovider.postData(body, 'process.php').subscribe(async data => {
          this.rate = data['oro'];
        });
      });
    }
    
    onInputTime(data) {
      if (data == "") {
        this.display = "";
      }else{
        this.display = (this.amount/this.rate) + "";
      }
    }
    
    showLoader() { // load show method
      this.loading = this.loadCtrl.create({
        message: 'Please wait...'
      }).then((res) => {
        res.present();
        res.onDidDismiss().then((dis) => {
        });
      });
    }
    
    hideLoader(id) {  // hide loader when register succes
      setTimeout(() => {
        this.loadCtrl.dismiss();
        this.presentAlert(id);
      }, 2000);
    }
    
    hideLoadererror(message) {  // hide loader when register fails
      setTimeout(() => {
        this.loadCtrl.dismiss();
        this.presentAlert(message);
      }, 2000);
    }
    
    async presentAlert(message) {
      const alert = await this.alertcontroller.create({
        header: 'Notice from Admin',
        message: message,
        buttons: ['OK'],
      });
      await alert.present();
    }
    
    convertnow(){
      if (this.amount > this.availablefunds || this.amount <= 0) {
        this.presentAlert('Invalid Amount');
      }else if(this.amount == null){
        this.presentAlert('Invalid Amount');
      }else if(this.pass == "" || this.pass == null){
        this.presentAlert('Please enter your password');
      }else{
        this.showLoader();
        return new Promise(resolve => {
          let body = {
            aksi: 'convertfunds',
            msrno: this.msrno,
            uname: this.username,
            amount: this.amount,
            password: this.pass
          };
          this.postprovider.postData(body, 'process.php').subscribe(async data => {
            this.response =  data['success'];
            this.message = data['message'];
            if(this.response == true){
              this.hideLoader('Fund Converted Successfully');
              this.getfunds();
              this.reset();
            }else{
              this.hideLoadererror(this.message);
            }
          });
        });
      }
    }
    
    reset(){
      this.amount = null;
      this.pass = null;
      this.convert = null;
    }
    
    dismiss() {
      // using the injected ModalController this page
      // can "dismiss" itself and optionally pass back data
      this.modalCtrl.dismiss({
        'dismissed': true
      });
    }
  }
  