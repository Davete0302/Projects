import { Component, OnInit } from '@angular/core';
import { PostProvider } from 'providers/postprovider';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.page.html',
  styleUrls: ['./withdraw.page.scss'],
})
export class WithdrawPage implements OnInit {
  
  amounts: any=[];
  
  loading;
  afunds : string = "";
  mode: string="1";
  money: string="5100";
  err: any;
  s_msrno : string = "";
  s_uname: string = "";
  flag : boolean = false;
  btn_status : string = "";
  compareWithFn = (o1, o2) => {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  };
  
  constructor(private modalCtrl: ModalController,private postPvdr: PostProvider,private router: Router,private loadingctrl: LoadingController,private alertController: AlertController, private storages: Storage) {
    for(let x=5100;x <= 5100;x+=500 ){
      this.amounts.push(x);
    }
    console.log(this.amounts);
  }
  
  ngOnInit() {
    this.storages.get('msrno').then((val) => {
      this.s_msrno = val;
    });
    this.storages.get('username').then((val) => {
      this.s_uname = val;
      this.update();
      this.buttonstatus();
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
      }else if(data == "Withdrawal Request Added Successfully"){
        this.presentAlert(this.err);
        const msrno = '/tabs/tab1';
        this.router.navigateByUrl(msrno);
      }
      else{
        this.presentAlert(this.err);
      }
    }, 2000);
  }
  
  async withdrawProcess(){ // dashboard get data method
   
    if(this.mode =="" || this.money=="" || this.mode ==null || this.money==null){
        this.presentAlert("Please complete all the fields");
    }else{

  
    this.showLoader();
    return new Promise(resolve => {
      let body = {
        aksi: 'withdraw',
        msrno: this.s_msrno,
        username: this.s_uname,
        wmode: this.mode,
        wmoney: this.money
      };
      this.postPvdr.postData(body, 'process-api.php').subscribe(async data => {
        this.err = data['prompt']['message'];
        if (this.err == "") {
          this.hideLoader('');
        }else{
          this.hideLoader(this.err);
        }
      });
    });
  }
  }
  
  async update(){ // dashboard get data method
    return new Promise(resolve => {
      let body = {
        aksi: 'getAvailFunds',
        msrno: this.s_msrno
      };
      this.postPvdr.postData(body, 'process-api.php').subscribe(async data => {
        this.afunds = data['availablefunds']['balance'];
      });
    });
  }
  
  async buttonstatus(){ // dashboard get data method
    return new Promise(resolve => {
      let body = {
        aksi: 'wbtnstatus',
        msrno: this.s_msrno
      };
      this.postPvdr.postData(body, 'process-api.php').subscribe(async data => {
        this.btn_status =data['btn']['btn_status'];
        console.log(data);
        if(this.btn_status == "show"){
          this.flag =true;
        }else{
          this.flag =false; 
        }
      });
    });
  }
  
  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
}
