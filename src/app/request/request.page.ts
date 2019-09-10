import { Component, OnInit } from '@angular/core';
import { ModalController,NavParams, AlertController, LoadingController } from '@ionic/angular';
import { PostProvider } from 'providers/postprovider';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-request',
  templateUrl: './request.page.html',
  styleUrls: ['./request.page.scss'],
})
export class RequestPage implements OnInit {
  private loading;
  s_msrno: any;
  id:any;
  datareading:any=[];
  constructor(private modalCtrl: ModalController,public postPvdr:PostProvider,public navParams:NavParams, private storages: Storage,
    private alertController: AlertController, private loadingctrl: LoadingController) { }

  ngOnInit() {
    this.id = this.navParams.get('msrid');
    console.log(this.id);
    this.getTradingData();

    this.storages.get('msrno').then((val) => {
      this.s_msrno = val;
    });
  }

  removeRequest(excid){
    return new Promise(resolve => {
      let body = {
        aksi: 'cancelRequest',
        msrno: this.s_msrno,
        exc_id: excid
      };
      this.postPvdr.postData(body, 'process-api.php').subscribe(async data => {
        console.log(data);
        this.getTradingData();
        this.hideLoader();
      });
    });
  }

  showLoader() {
    this.loading = this.loadingctrl.create({
      message: 'Removing...'
    }).then((res) => {
      res.present();
      
      res.onDidDismiss().then((dis) => {
      });
    });
    
  }

  async confirmCancel(data) {
    const alert = await this.alertController.create({
      header: 'Notice from Admin',
      message: 'Are you sure you want to Remove this Bid ?',
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
            this.removeRequest(data)
          }
        }
      ],
      cssClass: "toastercenter",
    });
    await alert.present();
  }

  hideLoader() {
    setTimeout(() => {
      this.loadingctrl.dismiss();
    }, 2000);
  }


  getTradingData(){
      
    return new Promise(resolve => {
      let body = {
        aksi: 'readRequests',
        msrno: this.id,
      };
      this.postPvdr.postData(body, 'process-api.php').subscribe(async data => {
        this.datareading= [];
        for (let report of data.requests) {
          this.datareading.push(report);
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
