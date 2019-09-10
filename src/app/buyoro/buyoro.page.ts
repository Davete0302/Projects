import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, LoadingController } from '@ionic/angular';
import { PostProvider } from 'providers/postprovider';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-buyoro',
  templateUrl: './buyoro.page.html',
  styleUrls: ['./buyoro.page.scss'],
})
export class BuyoroPage implements OnInit {
  data: any = [];
  id: any;
  amount : any;
  password = "";
  display: any;
  balance;
  passwordType: string = 'password';
  passwordIcon: string = 'eye';
  orovalue;
  username;
  prompt:any;
  oro: string ="";
  private loading;
  constructor(private modalCtrl: ModalController, private postPvdr: PostProvider, 
    private storage: Storage, private alertCtrl: AlertController, private loadCtrl: LoadingController) { }
    
    ngOnInit() {
      try {
        this.storage.get('msrno').then((val) => {
          this.id = val;
       
        });
        this.storage.get('username').then((val) => {
          this.username= val;
         
          this.getbal();
        });
      } catch (error) {
      }
    }
    
    getbal(){
      return new Promise(resolve => {
        let body = {
          aksi : 'getbalance',
          id : this.id,
          amount : this.amount,
          password : this.password,
          balance : this.balance,
          username : this.username,
        };
        this.postPvdr.postData(body, 'proses-api.php').subscribe(data => {
          for(let report of data.result) {
            this.data.push(report);
            this.balance = report.total;
            console.log('Hi'+report.total);
            this.orovalue = report.oro;
          }
          resolve(true);
        });
      });
    }
    
    async getrate(){ // oro rate get data method
      return new Promise(resolve => {
        let body = {
          aksi: 'getrate',
        };
        this.postPvdr.postData(body, 'process.php').subscribe(async data => {
          this.orovalue = data['oro'];
        });
      });
    }
    
    Convert(){
      if (this.amount === ''){
        this.amount='0';
      }
      return new Promise(resolve => {
        this.showLoader();
        let body = {
          aksi : 'convertnow',
          id : this.id,
          amount : this.amount,
          password : this.password,
          balance : this.balance,
          username : this.username,
        };
        this.postPvdr.postData(body, 'proses-api.php').subscribe(data => {
          this.prompt = data['success'];
          let mes= data['msg'];
            this.getbal();
            this.amount = '';
            this.password = '';
            this.hideLoadererror(mes);
   
       
          resolve(true);
        });
      });
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
   
    onInputTime(data) {
      if (data == "") {
        this.display = "";
      }else{
        this.display = (this.amount/this.orovalue) + "";
      }
    }
    
    dismiss() {
      this.modalCtrl.dismiss({
        'dismissed': true
      });
    }
    hideLoadererror(message) {  // hide loader when register fails
      setTimeout(() => {
        this.loadCtrl.dismiss();
        this.presentAlert(message);
      }, 2000);
    }
    
    async presentAlert(message) {
      this.alertCtrl.create({
        header: 'Alert',
        message: message,
        buttons: [
          {
            text: 'Okay',
          }
        ]
      }).then(alertEl => {
        alertEl.present();
      });
  }
}