



import { Component, OnInit } from '@angular/core';
import { PostProvider } from 'providers/postprovider';
import { Router } from '@angular/router';
import { LoadingController, AlertController, ModalController } from '@ionic/angular';
import { TransferfundPage } from '../transferfund/transferfund.page';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-transac-pass1',
  templateUrl: './transac-pass1.page.html',
  styleUrls: ['./transac-pass1.page.scss'],
})
export class TransacPass1Page implements OnInit {
  
  
  tpass : string = "";
  ctpass : string = "";
  lpass : string = "";
  err: string = "";
  loading;
  s_msrno:any;
  s_uname:any;
  
  constructor(private storages:Storage,private modalctrl: ModalController,private postPvdr: PostProvider,private router: Router,private loadingctrl: LoadingController,private alertController: AlertController) { }
  
  ngOnInit() {
    
    this.storages.get('msrno').then((val) => {
      this.s_msrno = val;
    });
    
    this.storages.get('username').then((val) => {
      this.s_uname = val;
      
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
      }
      else{
        this.presentAlert(data);
        this.cleartext();
      }
    }, 2000);
  }
  
  
  cleartext(){
    this.lpass = null;
    this.tpass = null;
    this.ctpass = null;
    
  }
  
  async openTransfer() {
    const modal = await this.modalctrl.create({
      component: TransferfundPage,
      componentProps: {
        'firstName': 'Douglas',
        'lastName': 'Adams',
        'middleInitial': 'N'
      }
    });
    return await modal.present();
  }
  
  
  
  
  
  async generatePass(){
    this.showLoader();
    return new Promise( resolve => {
      let body = {
        aksi: 'generatePass',
        msrno: this.s_msrno,
        username: this.s_uname,
        /*   name_customer : this.name_customer,
        desc_customer : this.desc_customer */
        
        pass1 : this.lpass,
        pass2 : this.tpass,
        pass3 : this.ctpass
        
      };
      this.postPvdr.postData(body, 'process-api.php').subscribe(async data=>{
        this.err = data['prompt']['message'];
        console.log(data);
        
        if (this.err == null) {
          
        }else{
          this.hideLoader(this.err);
        }
        
      });
      
    });
  }
  
  
}
