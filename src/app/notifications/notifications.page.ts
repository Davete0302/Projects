import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { PostProvider } from 'providers/postprovider';
import { LoadingController, AlertController, ModalController } from '@ionic/angular';
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  s_msrno:any;
  datareading:any=[];
  msg:any;
  constructor(public storages:Storage,public postPvdr:PostProvider,public modalCtrl:ModalController,
    private alertCtrl: AlertController) { }
iconhide:boolean=false;
  ngOnInit() {

    this.storages.get('msrno').then((val) => {
      this.s_msrno = val;
     this.displayNotif();
     });
  }
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }


  displayNotif(){

    return new Promise(resolve => {
      let body = {
        aksi: 'displayNotif',
        msrno: this.s_msrno,
      };
      this.postPvdr.postData(body, 'process-api.php').subscribe(async data => {
        this.datareading=[];
        for (let report of data.notifdata) {
            this.datareading.push(report);

            if(report.stats == '3'){
                this.msg= "Expired";
            }else if(report.stats == '2'){
                this.msg="Sold Out";

            }

          
        }



      });
    });
    
  }

  async read(exid){
    return new Promise(resolve => {
      let body = {
        aksi: 'updateNotif',
        msrno: this.s_msrno,
       exc_id:exid 
      };
      this.postPvdr.postData(body, 'process-api.php').subscribe(async data => {
        this.displayNotif();
      });
    });
    
  }

  async notificationsOpen(ids,price,oro,status) {
    let disp;
      if(status==1){
        disp='Pending';

      } if(status==2){
        disp='Sold Out';
      } if(status==3){
        disp='Expired';
      } if(status==4){
        disp='Sold';
      } if(status==5){
        disp='Cancelled';
      }

    this.alertCtrl.create({
      message: '<center>Status: '+ disp +'</center>'+'<center>Oro: '+ oro +'</center>'+
      '<center>Price: '+ price +'</center>'+'<center>Reference No.: '+ ids +'</center>', 
      buttons: [
        {
          text: 'Okay',
        }
      ]
    }).then(alertEl => {
      alertEl.present();
      
    });
    this.read(ids);


  }

}
