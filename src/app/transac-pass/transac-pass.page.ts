import { TopupfundPage } from '../topupfund/topupfund.page';
import { Component, OnInit } from '@angular/core';
import { PostProvider } from 'providers/postprovider';
import { Router } from '@angular/router';
import { LoadingController, AlertController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { SendoroPage } from '../sendoro/sendoro.page';
@Component({
  selector: 'app-transac-pass',
  templateUrl: './transac-pass.page.html',
  styleUrls: ['./transac-pass.page.scss'],
})
export class TransacPassPage implements OnInit {
  
  
  tpass : string = "";
  ctpass : string = "";
  lpass : string = "";
  err: string = "";
  s_msrno:any;
  s_uname:any;
  loading;
  
  constructor(private storages:Storage,private modalCtrl:ModalController,private postPvdr: PostProvider,private router: Router,
    private loadingctrl: LoadingController,private alertController: AlertController) { }
    
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
    
    
    async openSendOro() {
      const modal = await this.modalCtrl.create({
        component: SendoroPage,
        componentProps: {
          'firstName': 'Douglas',
          'lastName': 'Adams',
          'middleInitial': 'N'
        }
      });
      this.dismiss();
      modal.onDidDismiss().then((data) => {
        this.ngOnInit();
      });
      
      return await modal.present();
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
    
    dismiss() {
      // using the injected ModalController this page
      // can "dismiss" itself and optionally pass back data
      this.modalCtrl.dismiss({
        'dismissed': true
      });
      const msrno = '/tabs/tab1';
      this.router.navigateByUrl(msrno);
    }
    
    hideLoader(data) {
      setTimeout(() => {
        this.loadingctrl.dismiss();
        
        
        if (data == null) {
          
          this.cleartext();
        }else{
          this.presentAlert(this.err);
          this.cleartext();
        }
      }, 2000);
    }
    
    
    cleartext(){
      this.lpass = null;
      this.tpass = null;
      this.ctpass = null;
      
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
  