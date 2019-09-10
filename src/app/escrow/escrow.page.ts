import { Component, OnInit } from '@angular/core';
import { PostProvider } from 'providers/postprovider';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-escrow',
  templateUrl: './escrow.page.html',
  styleUrls: ['./escrow.page.scss'],
})
export class EscrowPage implements OnInit {
  
  
  loading;
  dayids:string="";
  amount: string="";
  dayid: string="";
  dayname: string="";
  wallet: string="";
  percent: string="";
  err : string="";
  s_msrno : string = "";
  s_uname: string = "";
  btn_status : string = "";
  flag : boolean = false;
  referral: any = [];
  
  
  constructor(private modalCtrl: ModalController,private postPvdr: PostProvider,private router: Router,private loadingctrl: LoadingController,private alertController: AlertController, private storages: Storage) { }
  
  ngOnInit() {
    
    this.storages.get('msrno').then((val) => {
      this.s_msrno = val;
    });
    this.storages.get('username').then((val) => {
      this.s_uname = val;
      this.getWallet();
      this.getTime();
      this.getbtn();
    });
    
  }
  
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
  
  async escrowProcess(){
    
    
    
    this.showLoader();
    return new Promise( resolve => {
      let body = {
        aksi: 'escrow',
        msrno: this.s_msrno,
        username: this.s_uname,
        /*   name_customer : this.name_customer,
        desc_customer : this.desc_customer */
        amt : this.amount,
        dayid : this.dayid
      };
      this.postPvdr.postData(body, 'process-api.php').subscribe(data=>{
        console.log(data);
        this.err = data['prompt']['message'];
        if (this.err == "") {
          this.hideLoader('');
        }else{
          this.hideLoader(this.err);
        }
      });
      
    });
    
  }
  
  async getWallet(){
    return new Promise(resolve => {
      let body = {
        aksi: 'getwallet',
        msrno: this.s_msrno
      };
      this.postPvdr.postData(body, 'process-api.php').subscribe(async data => {
        console.log(body);
        this.wallet = data['walletsrc']['balance'];
      }); 
    });
  }
  
  
  async getbtn(){
    return new Promise(resolve => {
      let body = {
        aksi: 'btn_escrowstatus',
        msrno: this.s_msrno
      };
      this.postPvdr.postData(body, 'process-api.php').subscribe(async data => {
        console.log(body);
        this.btn_status =data['status']['btn_status'];
        if(this.btn_status == "show"){
          this.flag =true;
        }else{
          this.flag =false; 
        }
      });
    });
  }

  async getTime(){
    return new Promise(resolve => {
      let body = {
        aksi: 'getwallettime',
        msrno: this.s_msrno,
        username: this.s_uname,
      };
      this.postPvdr.postData(body, 'process-api.php').subscribe(async data => {
        // console.log(body);
        // this.dayid = data['daysrc']['day_id'];
        // this.dayname = data['daysrc']['day_name'];
        // this.percent = data['daysrc']['day_percent'];
        // console.log(this.dayid);
        // console.log(this.dayname);
        // console.log(this.percent);
        for (let report of data.daysrc) {
          this.referral.push(report);
        }
        console.log(this.referral);
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
      if (data == "") {
      }else{
        this.presentAlert(this.err);
      }
    }, 2000);
  }
}
