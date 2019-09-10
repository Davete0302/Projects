import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';
import { PostProvider } from 'providers/postprovider';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-cashoutinfo',
  templateUrl: './cashoutinfo.page.html',
  styleUrls: ['./cashoutinfo.page.scss'],
})
export class CashoutinfoPage implements OnInit {
  fname="";
  mname="";
  lname="";
  contact="";
  address="";
  message="Coming Soon";
  outlet="TBD";
  amount=0;
  id;
  funds;
  type="";
  constructor(private activatedRoute:ActivatedRoute, private toastController: ToastController, private postPvdr: PostProvider, private alertCtrl: AlertController
              ,private router: Router, private storages: Storage ) { }
  
  ngOnInit() {
  }
  ionViewDidEnter(){
    this.storages.get('msrno').then((val) => {
      this.id = val;
      this.getbal();
    });
  
    this.outlet = this.activatedRoute.snapshot.paramMap.get('bank');
    this.type=this.activatedRoute.snapshot.paramMap.get('type');
    
    let am = this.activatedRoute.snapshot.paramMap.get('amount');
    this.amount = +am;
  }
  async presentToast(mess) {
    const toast = await this.toastController.create({
      message: mess,
      duration: 2000,
      position: 'bottom',
      cssClass: "toast-scheme ",
    });
    toast.present();
  }
  Pay(){
    if(this.type=='other'){
      if(this.fname=="" || this.fname== null || this.lname=="" || this.lname== null || this.contact =="" || this.contact== null || this.address=="" || this.address== null){
        this.presentToast('Please Fill in All Fields');
      }else{
        this.continue('Cash-out order','Continue Transaction?');
      }
    }else if(this.type=='bank'){
      if(this.fname=="" || this.fname== null || this.lname=="" || this.lname== null || this.contact =="" || this.contact== null){
        this.presentToast('Please Fill in All Fields');
      }else{
        this.continue('Cash-out order','Continue Transaction?');
      }
    }else{
      if(this.fname=="" || this.fname== null  || this.contact =="" || this.contact== null){
        this.presentToast('Please Fill in All Fields');
      }else{
        this.continue('Cash-out order','Continue Transaction?');
      }
    }
  }
  getbal(){
    return new Promise(resolve => {
      let body = {
        aksi : 'getAvailFunds',
        msrno : this.id,
        
      };
      this.postPvdr.postData(body, 'process-api.php').subscribe(data => {
        this.funds = data['availablefunds']['balance'];
        resolve(true);
      });
    });
  }
  continue(header,message){
    this.alertCtrl.create({
      header:header,
      cssClass:'scaledAlert',
      message: message, 
      
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
         
        },
        {
          text: 'Pay',
          handler: () => {
            this.Payment();
          }
        }
      ]
    }).then(alertEl => {
      alertEl.present();
    });
  }
  Done(messages){
    this.alertCtrl.create({
      header:'Notice from admin',
      cssClass:'scaledAlert',
      message: messages, 
      
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            const route = 'bank-withdraw';
            this.router.navigateByUrl(route);
          }
        }
      ]
    }).then(alertEl => {
      alertEl.present();
    });
  }
  Payment(){
this.presentToast('Coming Soon');
  //   console.log('clicked1');
  //   return new Promise(resolve => {
  //     let body = {
  //       aksi : 'cashoutRequest',
  //       id : this.id,
  //       amount : this.amount,
  //       outlet: this.outlet,
  //       fname: this.fname,
  //       mname: this.mname,
  //       lname: this.lname,
  //       address: this.address,
  //       contact: this.contact,
  //       type: this.type,
  //     };
  //     this.postPvdr.postData(body, 'proses-api.php').subscribe(data => {
  //       let mess=data['prompt']['message'];
  //       console.log(mess);
  //       this.Done(mess);
  //       resolve(true);
  //     });
  //   });
   }
  back(){
    const route = 'cashout/' + this.outlet+'/'+this.type ;
        
    this.router.navigateByUrl(route);
  }
}
