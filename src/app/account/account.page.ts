import { Component, OnInit } from '@angular/core';
import { PostProvider } from 'providers/postprovider';
import { ToastController, LoadingController, AlertController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  private loading;
  // get
  msrno: any = "";
  username: any = "";
  bankname: any = "";
  accountname: any = "";
  accountno: any = "";
  bitcoin: any = "";
  fullname: any = "";
  fname: any = "";
  pmode: any = "";
  display: any = "";
  monum: any = "";
  email: any = "";
  
  // send
  bname: any = "";
  aname: any = "";
  anum: any = "";
  btc: any = "";
  full: any = "";
  payment: any = "";
  emadd: any = "";
  mob: any = "";
  constructor(private postprovidder: PostProvider, private storage: Storage, 
    private loadCtrl: LoadingController,private toaster: ToastController,
    private router: Router, private alertcontroller: AlertController, private modalCtrl: ModalController) { }
    
    ngOnInit() {
      this.storage.get('msrno').then((val) => {
        this.msrno = val;
        this.dataload(this.msrno);
      });
    }
    
    async dataload(msrnumber){ // update get data method
      return new Promise(resolve => {
        let body = {
          aksi: 'update',
          msrsnumber: msrnumber
        };
        this.postprovidder.postData(body, 'process.php').subscribe(async data => {
          this.username = data['account']['username'];
          this.accountname = data['account']['accountname'];
          this.accountno = data['account']['accountno'];
          this.bitcoin = data['account']['bitcoinadd'];
          this.bankname =  data['account']['bankname'];
          this.fullname = data['account']['fname'];
          this.pmode = data['account']['pmode'];
          this.monum = data['account']['mobilenum'];
          this.bankname = data['account']['bank'];
          this.email = data['account']['email'];
          if(this.pmode == '1'){
            this.display = "Bank Deposit";
          }else if(this.pmode == '3'){
            this.display = "Palawan Express";
          }else{
            this.display = "Set Payment Method";
          }
        });
      });
    }
    
    async update(){ // update send data method
      if (this.payment == "" || this.bname == "") {
        this.presentAlert('Reselect your Bank or Payment Mode Before Saving Data');
      }else{
        this.showLoader();
        return new Promise(resolve => {
          let body = {
            aksi: 'updateaccount',
            fullname: this.full,
            bankname: this.bname,
            accountname: this.aname,
            accountnum: this.anum,
            bitcoinaddress: this.btc,
            paymentmode: this.payment,
            emailaddress: this.emadd,
            mobilenumber: this.mob,
            msrno:  this.msrno
          };
          this.postprovidder.postData(body, 'process.php').subscribe(async data => {
            if(data['success'] == true){
              this.hideLoader();
            }else{
              this.hideLoadererror();
            }
          });
        });
      }
    }
    
    showLoader() { // load show method
      this.loading = this.loadCtrl.create({
        message: 'Saving Data...'
      }).then((res) => {
        res.present();
        res.onDidDismiss().then((dis) => {
        });
      });
    }
    
    hideLoader() {  // hide loader when register succes
      setTimeout(() => {
        this.loadCtrl.dismiss();
        this.presentAlert('Account Details Successfully Saved');
      }, 2000);
    }
    
    hideLoadererror() {  // hide loader when register fails
      setTimeout(() => {
        this.loadCtrl.dismiss();
        this.presentAlert('Saving Account Details Failed');
      }, 2000);
    }
    
    async presentAlert(message) {
      const alert = await this.alertcontroller.create({
        header: 'Notice from Admin',
        message: message,
        buttons: ['OK'],
        cssClass: "toaster",
      });
      await alert.present();
    }
    
    dismiss() {
      this.modalCtrl.dismiss({
        'dismissed': true
      });
    }
    
    // doRefresh(event) {
    //   setTimeout(() => {
    //     this.ngOnInit();
    //     event.target.complete();
    //   }, 2000);
    // }
  }
  