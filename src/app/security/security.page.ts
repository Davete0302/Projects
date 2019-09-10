import { Component, OnInit } from '@angular/core';
import { PostProvider } from 'providers/postprovider';
import { LoadingController, ToastController, AlertController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-security',
  templateUrl: './security.page.html',
  styleUrls: ['./security.page.scss'],
})
export class SecurityPage implements OnInit {
  msrno: any = "";
  private loading;
  
  curpass: any;
  newpass: any;
  confpass: any;
  constructor(private postprovidder: PostProvider, private storage: Storage, 
    private loadCtrl: LoadingController,private toaster: ToastController,
    private router: Router, private alertcontroller: AlertController, private modalCtrl: ModalController) { }
    
    ngOnInit() {
      this.storage.get('msrno').then((val) => {
        this.msrno = val;
      });
    }
    
    async updatesec(){ // update send data method
      if ( this.curpass == null || this.newpass == null || this.confpass == null ) {
        this.presentAlert('Dont leave all fields blank');
      }else{
        if ( this.newpass != this.confpass) {
          this.presentAlert('Your new password and confirmation password do not match');
          this.reset();
        }else{
          this.showLoader();
          return new Promise(resolve => {
            let body = {
              aksi: 'security',
              curpass: this.curpass,
              newpass: this.newpass,
              msrno: this.msrno
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
    }
    
    showLoader() { // load show method
      this.loading = this.loadCtrl.create({
        message: 'Saving Password...'
      }).then((res) => {
        res.present();
        res.onDidDismiss().then((dis) => {
        });
      });
    }
    
    hideLoader() {  // hide loader when register succes
      setTimeout(() => {
        this.loadCtrl.dismiss();
        this.presentAlert('Upating Password Successful');
        this.reset();
      }, 2000);
    }
    
    hideLoadererror() {  // hide loader when register fails
      setTimeout(() => {
        this.loadCtrl.dismiss();
        this.presentAlert('Upating Password Failed');
        this.reset();
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
    
    reset(){
      this.curpass = "";
      this.newpass = "";
      this.confpass = "";
    }

     
    dismiss() {
      this.modalCtrl.dismiss({
        'dismissed': true
      });
    }
}
