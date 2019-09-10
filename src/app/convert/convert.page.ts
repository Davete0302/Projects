import { Component, OnInit } from '@angular/core';
import { PostProvider } from 'providers/postprovider';
import { Router } from '@angular/router';
import { LoadingController, AlertController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-convert',
  templateUrl: './convert.page.html',
  styleUrls: ['./convert.page.scss'],
})
export class ConvertPage implements OnInit {
  loading;
  afunds : string = "";
  amount : string = "";
  password : string = "";
  err : string = "";
  btn_status : string = "";
  flag : boolean = false;
  s_msrno : string = "";
  s_uname: string = "";

  constructor(private modalCtrl: ModalController,private postPvdr: PostProvider,private router: Router,private loadingctrl: LoadingController,private alertController: AlertController, private storages: Storage) {


   }

  ngOnInit() {
    
    this.storages.get('msrno').then((val) => {
      this.s_msrno = val;
      });
      this.storages.get('username').then((val) => {
        this.s_uname = val;
        this.update();

        });
   
        
     

  
  }
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }


  cleartext(){
   
    this.password = "";

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
      }else{
        this.presentAlert(this.err);
      }
    }, 2000);
  }

  

  async convertProcess(){


    if(this.amount == "" || this.password == ""){
        this.presentAlert("Please fill in all fields");
    }else{

  
   
    this.showLoader();
    return new Promise( resolve => {
      let body = {
        aksi: 'convert',
        msrno: this.s_msrno,
        username: this.s_uname,
      /*   name_customer : this.name_customer,
        desc_customer : this.desc_customer */

        amt : this.amount,
        password   :this.password,
     

      };
      this.postPvdr.postData(body, 'process-api.php').subscribe(data=>{
        console.log(data);
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
        this.btn_status =data['availablefunds']['btn_status'];


        if(this.btn_status == "show"){
            this.flag =true;
        }else{
          this.flag =false; 
        }
       
      });
    });
  }

  
}
