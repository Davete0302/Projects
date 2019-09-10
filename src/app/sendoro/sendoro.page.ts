import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, LoadingController, NavParams } from '@ionic/angular';
import { Router } from '@angular/router';
import { PostProvider } from 'providers/postprovider';
import { Storage } from '@ionic/storage';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-sendoro',
  templateUrl: './sendoro.page.html',
  styleUrls: ['./sendoro.page.scss'],
})
export class SendoroPage implements OnInit {
  s_msrno: any;
  curr_oro: any;
  username: string="";
  fname: string="";
  amount: string="";
  mobile: string="";
  password: string="";
  err : string="";
  s_uname: string = "";
  private loading;
  res:any;
  amt:any;
  sample: any;
  walletadd:any="";
  bol: boolean = true;
  type:any;
  head: any = "Select Wallet Source";
  currency: any = "";
  displaywallet: any = "0";
  wtype:any="u";
  note:any;
  scannedCode :any;
  constructor(private modalCtrl: ModalController,private postPvdr: PostProvider,private router: Router,private loadingctrl: LoadingController,
    private alertController: AlertController,public navParams:NavParams, private storages: Storage,private barcodeScanner: BarcodeScanner) { }
    
    ngOnInit() {
 
      this.storages.get('msrno').then((val) => {
        this.s_msrno = val;
         let meth =  this.navParams.get('method');
      console.log(meth);
        if(meth=="0"){
         
          this.walletadd = "";
        }else{
          // this.walletadd = wal;
          this.scanCode();
       
        }

        

        this.dashboard();
      });
    }

    scanCode(){
      this.barcodeScanner.scan().then(barcodeData => {
        this.walletadd = barcodeData.text;
          


        


      });
    }
    
    async dashboard(){ // dashboard get data method
      this.bol = true;
      return new Promise(resolve => {
        let body = {
          aksi: 'dashboard',
          msrno: this.s_msrno
        };
        this.postPvdr.postData(body, 'process.php').subscribe(async data => {
          console.log(data);
          this.curr_oro = data['results']['oro'];
          this.sample = data['results']['first'];
          this.bol = false;
         
          if(this.wtype == "u"){
            this.head = "Available Funds";
            this.currency = "PHP ";
            this.displaywallet = this.sample;
            this.type = "transfer";
          }else if(this.wtype == "o"){
            this.head = "Oro Funds";
            this.currency = "ORO ";
            this.displaywallet = this.curr_oro;
            this.type = "sendoro";
          }
        });
      });
    }
    
    dismiss() {
      this.modalCtrl.dismiss({
        'dismissed': true
      });
    }
    
    gotoPass(){
      this.dismiss();
      const msrno = '/transac-pass';
      this.router.navigateByUrl(msrno);
    }
    
    
    showLoader() {
      this.loading = this.loadingctrl.create({
        message: 'Sending...'
      }).then((res) => {
        res.present();
        
        res.onDidDismiss().then((dis) => {
          this.router.navigate(['/tabs/tab1']);
        });
      });
      
    }
    
    
    
    cleartext(){
     
      this.amt = "";
      this.walletadd = "";
    }
    
    hideLoader(res,prompt) {
      setTimeout(() => {
        this.loadingctrl.dismiss();
        if (!res) {
          this.presentAlert(prompt);
          //  this.cleartext();
          //  this.dismiss();
        }else{
          this.presentAlert(prompt);
          this.cleartext();
          this.dismiss();
        }
      }, 2000);
    }
    
    async createdProcess(){
       
      if(this.walletadd=="" || this.amt=="" || this.type=="" || this.walletadd==null || this.amt==null || this.type==null || this.amt==0){
          this.presentAlert("All fields are required");
      }else if(this.type=="transfer" && this.amt<500){
        this.presentAlert("Enter Valid Amount");
      }
     
      else{

       
        console.log(this.type);
        this.showLoader();
        return new Promise( resolve => {
          let body = {
            aksi: this.type,
            msrno: this.s_msrno,
            walletadd: this.walletadd,
            amt: this.amt,
            note:this.note,
            type: this.wtype
          };
          this.postPvdr.postData(body, 'process-api.php').subscribe(async data=>{
            this.err = data['prompt'];
            this.res = data['success'];
            this.hideLoader(this.res,this.err);
            this.dashboard();
          });
        });
      }
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


    onInputTime($event){
     this.dashboard();
    
    }
   
  }
  