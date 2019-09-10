import { Component, OnInit } from '@angular/core';
import { PopoverController, NavParams, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { PostProvider } from 'providers/postprovider';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import * as moment from 'moment';
@Component({
  selector: 'app-modalbuy',
  templateUrl: './modalbuy.page.html',
  styleUrls: ['./modalbuy.page.scss'],
})
export class ModalbuyPage implements OnInit {
  ppos:any;
  oros:any;
  msrno:any;
  post_msrno:any;
  availablefunds:any;
  oro_amount:any;
  result:any=0;
  result2:any;
  exc_id:any;
  prompt:any;
  msg:any;
  date:any;
  availability2:any;
  constructor(public alertcontoller:AlertController,private popoverController: PopoverController,public navParams:NavParams,public storage: Storage,public postprovidder: PostProvider) { }
  
  ngOnInit() {

    this.storage.get('msrno').then((val) => {
      this.msrno = val;
   this.dashboard();

   setInterval(() => {
    this.dashboard();
this.refreshOro();

  }, 5000);

    });

    this.ppos = this.navParams.get('key1');
       this.oros = this.navParams.get('key2');
       this.post_msrno = this.navParams.get('key3');
       this.exc_id = this.navParams.get('key4');
  
  
  }

   
    refreshOro(){
      return new Promise(resolve => {
        let body = {
          aksi: 'refresh_oro',
          exc_id: this.exc_id,
        };
        this.postprovidder.postData(body, 'process-api.php').subscribe(async data => {
            this.oros = data['oro']
        });
      });
      
    }


  
  buy(){
    this.date = new Date();
      this.date.setDate( this.date.getDate() + 1 );
      this.availability2=moment(this.date).format("YYYY-MM-DD HH:mm:ss");
  
   if(this.oro_amount=="" || this.oro_amount==null || this.oro_amount<0){
        this.presentAlert("Invalid Amount");
   }
   
   else{

     console.log(this.result)
  if(this.result > this.availablefunds){

    this.presentAlert("Not Enough Funds");

  }else{
    

        return new Promise(resolve => {
          let body = {
            aksi: 'tradeoro',
            exc_id: this.exc_id,
            buyer: this.msrno,
            oro: this.oro_amount,
            ppos: this.result,
            availablefunds:this.availablefunds , 
            seller: this.post_msrno,
            expire: this.availability2
          };
          this.postprovidder.postData(body, 'process-api.php').subscribe(async data => {
         
            this.prompt = data['success'];
            this.msg = data['prompt'];
            let mobile = data['mobile'];
            let email = data['email'];
            console.log(data);
            if(!this.prompt){
              this.presentAlert(this.msg);
                this.oro_amount="";
            }else{
                this.presentAlert2("Seller Information <br> mobile: "+mobile+"<br>email: "+email+"<br>");
                  this.close();

            }
       
          
          });
        });
     
      }
      }
   
  }
  async presentAlert2(message) {
    const alert = await this.alertcontoller.create({
      header: 'Successfull !',
      message: message,
      buttons: ['OK'],
      cssClass: "toaster",
    });
    await alert.present();
  }

  async presentAlert(message) {
    const alert = await this.alertcontoller.create({
      header: 'Notice from Admin',
      message: message,
      buttons: ['OK'],
      cssClass: "toaster",
    });
    await alert.present();
  }




  onInputTime(data) {
    if (data == "") {
      this.result= 0;
    }else{
      this.result = (this.oro_amount*this.ppos) ;
    }
    
  }

  async dashboard(){ // dashboard get data method
    return new Promise(resolve => {
      let body = {
        aksi: 'dashboard',
        msrno: this.msrno
      };
      this.postprovidder.postData(body, 'process.php').subscribe(async data => {
     
        this.availablefunds = data['results']['first'];
   
       
        // this.getnews();
        // this.refname = this.username;
      });
    });
  }
  
  async close() {
    await this.popoverController.dismiss();
  }
  
}
