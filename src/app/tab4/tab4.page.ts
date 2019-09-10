import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { AccountPage } from '../account/account.page';
import { ModalController, AlertController, LoadingController } from '@ionic/angular';
import { SecurityPage } from '../security/security.page';
import { PostProvider } from 'providers/postprovider';
import { ConvertHistoryPageModule } from '../convert-history/convert-history.module';
import { NotificationsPage } from '../notifications/notifications.page';
@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  private loading;
  s_uname: any = "";
  s_msrno:any;
  flag:boolean = false;
  countNotif:any;
  datareading:any=[];
  constructor(private postPvdr:PostProvider,private storages: Storage, private router: Router, private modalctrl: ModalController, private alertController: AlertController, private loadingctrl: LoadingController) { }
  
  ngOnInit() {
    
  }
  
  getNotif(){
    
    return new Promise(resolve => {
      let body = {
        aksi: 'readNotif',
        msrno: this.s_msrno,
      };
      this.postPvdr.postData(body, 'process-api.php').subscribe(async data => {
        this.countNotif = data['count'];
        if(this.countNotif <=0){
          this.flag= false
        }else{
          this.flag= true;
        }
        // for (let report of data.trading) {
        // //  this.datareading.push(report);
        //   this.countNotif++;
        // }
        
      });
    });
    
    
  }
  
  ionViewDidEnter(){
    this.storages.get('username').then((val) => {
      this.s_uname = val;
    });
    
    this.storages.get('msrno').then((val) => {
      this.s_msrno = val;
      this.getNotif();
    });
  }
  
  showLoader() {
    this.loading = this.loadingctrl.create({
      message: 'Logging out...'
    }).then((res) => {
      res.present();
      
      res.onDidDismiss().then((dis) => {
      });
    });
    
  }
  
  hideLoader() {
    setTimeout(() => {
      this.loadingctrl.dismiss();
      this.router.navigateByUrl('login');
    }, 2000);
  }
  
 changePin() {
      this.router.navigateByUrl('/changepin');
  }
  logout(){
    this.presentLogout();
  }
  
  async openAccount() {
    const modal = await this.modalctrl.create({
      component: AccountPage,
      componentProps: {
        'firstName': 'Douglas',
        'lastName': 'Adams',
        'middleInitial': 'N'
      }
    });
    return await modal.present();
  }
  
  async openCpass() {
    const modal = await this.modalctrl.create({
      component: SecurityPage,
      componentProps: {
        'firstName': 'Douglas',
        'lastName': 'Adams',
        'middleInitial': 'N'
      }
    });
    return await modal.present();
  }
  
  async presentLogout() {
    const alert = await this.alertController.create({
      header: 'Continue?',
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
            this.showLoader();
            console.log('Yes clicked');
            this.storages.clear();
            this.hideLoader();
          }
        }
      ],
      cssClass: "toastercenter",
    });
    await alert.present();
  }
  
  
  async openNotif() {
    const modal = await this.modalctrl.create({
      component: NotificationsPage,
      componentProps: {
        'firstName': 'Douglas',
        'lastName': 'Adams',
        'middleInitial': 'N'
      }
    });
    
    modal.onDidDismiss().then((data) => {
      this.getNotif();
    });
    
    return await modal.present();
  }
}
