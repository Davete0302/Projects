import { Component, OnInit } from '@angular/core';
import { PostProvider } from 'providers/postprovider';
import { Storage } from '@ionic/storage';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Keyboard } from '@ionic-native/keyboard/ngx';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private loading;
  public passwordType: string;
  uname;
  txtUsername: string = "";
  txtPassword: string = "";
  response: any;
  Msrid: any;
  msrno: any;
  constructor(private keyboard:Keyboard,private postprovidder: PostProvider, private storage: Storage, 
    private loadCtrl: LoadingController,private toaster: ToastController,
    private router: Router,private alertcontroller: AlertController) { }
    
    ngOnInit() {
      this.storage.get('msrno').then((val) => {
        if (val == "" || val == null) {
        }else{
          const msrno = 'lockscreen';
          console.log(val);
          this.router.navigateByUrl(msrno);
        }
      });
    }
    togglePasswordType() {
      this.passwordType = this.passwordType || 'password';
      this.passwordType = (this.passwordType === 'password') ? 'text' : 'password';
    }
    
    async login(){      // dashboard get data method
      this.showLoader();
        return new Promise(resolve => {
          let body = {
            aksi: 'login',
            username: this.txtUsername,
            password: this.txtPassword,
      
          };
          this.postprovidder.postData(body, 'process.php').subscribe(async data => {
            this.response =  data['success'];
            this.Msrid = data['msr'];
            this.uname = data['uname'];
            if (this.response == true) {
              this.storage.set('msrno', this.Msrid);
              this.storage.set('username', this.uname);
              this.hideLoader(this.Msrid);
              
            }else{
              this.hideLoadererror();
            }
          }, error => {
            this.hideLoadercatch("Connection Timed out");
          });
        });
    }
    
    showLoader() { // load show method
      this.loading = this.loadCtrl.create({
        message: 'Authenticating...'
      }).then((res) => {
        res.present();
        res.onDidDismiss().then((dis) => {
        });
      });
    }
    
    hideLoader(id) {  // hide loader when register succes
      setTimeout(() => {
        this.loadCtrl.dismiss();
        const msrno = '/tabs/tab1';
        this.router.navigateByUrl(msrno);
      }, 2000);
    }
    
    hideLoadererror() {  // hide loader when register fails
      setTimeout(() => {
        this.loadCtrl.dismiss();
        this.showLongToast();
      }, 2000);
    }

    hideLoadercatch(data) {  // hide loader when register fails
      setTimeout(() => {
        this.loadCtrl.dismiss();
        this.presentAlert(data);
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

    async showLongToast() { // show toast message
      const toast = await this.toaster.create({
        message: 'Authentication Failed',
        duration: 3000,
        position: 'bottom',
        color: 'medium',
        showCloseButton: true,
        closeButtonText: 'Got it!',
        cssClass: "toaster",
      });
      toast.present();
      this.reset();
    }

    reset(){
      this.txtUsername = "";
      this.txtPassword = "";
    }
}
  