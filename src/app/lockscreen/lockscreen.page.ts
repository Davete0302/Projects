import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NavController, ToastController} from '@ionic/angular';
import { PostProvider } from 'providers/postprovider';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-lockscreen',
  templateUrl: './lockscreen.page.html',
  styleUrls: ['./lockscreen.page.scss'],
})
export class LockscreenPage {
  
  @Input() pagetitle: String = "Enter Pin";
  err : string="";
  pin:string= "";
  old_pin:any;
  s_msrno: string="";
  s_uname:string="";
  walletadd:string="";
  prewallet:string="";
  loading:any;
  hider: boolean = true;
  
  @Output() change: EventEmitter<string> = new EventEmitter<string>();
  
  constructor(private loadCtrl: LoadingController,private postPvdr: PostProvider,private navCtrl: NavController,private storages: Storage, private router: Router,public toastController:ToastController, private alertController: AlertController) {}
  
  emitEvent() {
    
    this.change.emit(this.pin);

    this.pin = "";
  }
  
  hideLoader() {  // hide loader when register succes
    setTimeout(() => {
      this.loadCtrl.dismiss();
      const msrno = '/tabs/tab1';
      this.router.navigateByUrl(msrno);
    }, 2000);
  }
  
  hideLoadererror(msg) {  // hide loader when register fails
    setTimeout(() => {
      this.loadCtrl.dismiss();
      this.presentToast(msg);
    }, 2000);
  }
  
  async showLongToast() { // show toast message
    const toast = await this.toastController.create({
      message: 'Invalid',
      duration: 3000,
      position: 'bottom',
      color: 'medium',
      showCloseButton: true,
      closeButtonText: 'Got it!',
      cssClass: "toaster",
    });
    toast.present();
    
  }
  showLoader() { // load show method
    this.loading = this.loadCtrl.create({
      message: 'Loading...'
    }).then((res) => {
      res.present();
      res.onDidDismiss().then((dis) => {
      });
    });
  }
  
  ngOnInit() {
    this.storages.get('msrno').then((val) => {
      this.s_msrno = val;
    });
    this.storages.get('username').then((val) => {
      this.s_uname = val;
      this.displaywallet();
      this.getOldPin();
    });
  }
  
  getOldPin(){
    return new Promise(resolve => {
      let body = {
        aksi: 'getOldPin',
        msrno: this.s_msrno
      };
      this.postPvdr.postData(body, 'process-api.php').subscribe(async data => {
        //this.old_pin = data['availablefunds']['balance'];
        this.old_pin = data['old']['pin'];
       
        if(this.old_pin === null || this.old_pin === "" || this.old_pin === "1234"){
          this.presentToastWithOptions();
        }else{
        }
        this.hider = false;
      });
    });
    
  }
  
  
  logout(){

    this.presentLogout();
  }
  
  
  handleInput(pin: string) {
    if (pin === "clear") {
      this.pin = "";
      return;
    }
    this.pin += pin;
    if (this.pin.length === 4) {
     this.lockscreenProcess();
    }
  }
  
  Pin: String ="";
  ShowPin: Boolean = false;
  
  eventCapture(event) {
    this.ShowPin = false;
    this.Pin=event;
  }
  
  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      
    });
    toast.present();
  }
  
  
  async lockscreenProcess(){
    
    this.showLoader();
    
    return new Promise( resolve => {
      let body = {
        aksi: 'readlockscreen',
        msrno: this.s_msrno,
        pin: this.pin,
        walletadd: this.prewallet
      };
      this.postPvdr.postData(body, 'process-api.php').subscribe(data=>{
      
        this.err = data['wallet']['value'];
     
        if(this.err == "Valid"){
          this.pin = "";
          this.hideLoader();
          
          
        }else if(this.err == "Invalid Wallet"){
          this.hideLoadererror("Invalid Wallet");
          // console.log("Invalid Wallet");
          this.pin = "";
        }else if(this.err == "Invalid Pin"){
          // const msrno = '/tabs/tab1';
          // this.router.navigateByUrl(msrno);
          //this.router.navigate(["/tabs/tab1"]);
          this.hideLoadererror("Invalid Pin");
          
          this.pin = "";
        }else{
          //  console.log();
          this.hideLoadererror("Incorrect Wallet Address and Pin");
          
          this.pin = "";
        }
        
        
      });
      
    });
  }
  
  async displaywallet(){
    // console.log(this.s_msrno);
    return new Promise( resolve => {
      let body = {
        aksi: 'getwalletadd2',
        msrno: this.s_msrno,
        type: 'o'
        
        
        
      };
      this.postPvdr.postData(body, 'process-api.php').subscribe(data=>{
        
        this.prewallet = data['wallet']['value'];
        
        
      });
      
    });
  }
  
  
  async presentToastWithOptions() {
    const toast = await this.toastController.create({
      header: 'Note:',
      message: 'Your Default Pin is <i><u>1234</u></i>',
      position: 'bottom',
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }
  
  
  async presentLogout() {
    const alert = await this.alertController.create({
      header: 'Notice from Admin',
      message: 'Are you sure you want to logout ?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.showLoaderchange();
            console.log('Yes clicked');
            this.storages.clear();
            this.hideLoadererrr();
          }
        }
      ],
      cssClass: "toastercenter",
    });
    await alert.present();
  }
  
  hideLoadererrr() {
    setTimeout(() => {
      this.loadCtrl.dismiss();
      this.router.navigateByUrl('login');
    }, 2000);
  }
  
  showLoaderchange() {
    this.loading = this.loadCtrl.create({
      message: 'Changing account...'
    }).then((res) => {
      res.present();
      
      res.onDidDismiss().then((dis) => {
      });
    });
    
  }
}
