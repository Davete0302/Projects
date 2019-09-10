
import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { NavController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { PostProvider } from 'providers/postprovider';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-changepin',
  templateUrl: './changepin.page.html',
  styleUrls: ['./changepin.page.scss'],
})
export class ChangepinPage implements OnInit{

  lebel:string="Enter Current Pin";
  cpin:any;
  npin:any;
  npin2:any;
  arrpin:any=[];
  count:any=0;
  s_msrno:any;
  old_pin:any;
  message:any;
  @Input() pagetitle: String = "Enter Pin";

  pin:string= "";

  @Output() change: EventEmitter<string> = new EventEmitter<string>();


  constructor(private router:Router,private navCtrl: NavController,  public modelCtrl: ModalController,public postPvdr:PostProvider,public storages: Storage,public toastController:ToastController) {

    
  }

 

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
    
    });
    toast.present();
  }

  
  ngOnInit() {
    
    this.storages.get('msrno').then((val) => {
      this.s_msrno = val;

      this.getOldPin();
      });
  
  
  }

  updatePin(mynewpin){
    
    return new Promise(resolve => {
    let body = {
      aksi: 'updatePin',
      msrno: this.s_msrno,
      newpin: mynewpin
    };
    this.postPvdr.postData(body, 'process-api.php').subscribe(async data => {
 
      this.message = data['success'];
        

     
    });
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
       

     
    });
  });

  }

  emitEvent() {


    this.change.emit(this.pin); 
if(this.pin.length < 4){
  this.presentToast("Invalid Pin");
}else{


      this.arrpin.push(this.pin);
      //console.log(this.count);
      //console.log(this.arrpin[this.count]);


      if(this.count == 0){
        if(this.arrpin[this.count] == this.old_pin){
         // console.log("match");
          this.count++;
          if(this.count==1){
            this.lebel="Enter New Pin";
          }else if(this.count==2){
            this.lebel="Re- nter New Pin";
          }
          
        }else if(this.arrpin[this.count] !=  this.old_pin && this.count==0){
          this.presentToast("Incorrect current pin");
          this.count=0;
          this.arrpin = [];
        }
  
      }else{
        this.count++;
        if(this.count==1){
          this.lebel="Enter New Pin";
        }else if(this.count==2){
          this.lebel="Re-enter New Pin";
        }
      }

      if(this.count ==3 && this.arrpin[1] != this.arrpin[2]){
        this.presentToast("Pin did not match");
          this.count=0;
          this.arrpin = [];
          
          this.lebel="Enter Current Pin";

      }else if(this.count ==3 && this.arrpin[1] == this.arrpin[2]){
        this.updatePin(this.arrpin[2]);
        this.presentToast("Pin successfully updated");
        const msrno = '/tabs/tab4';
        this.router.navigateByUrl(msrno);

      }
    }
      
      this.pin="";

      

  }

  handleInput(pin: string) {
    if (pin === "clear") {
      this.pin = "";
      return;
    }

    if (this.pin.length === 4) {
      return;
    }
    this.pin += pin;
  }

  Pin: String ="";
  ShowPin: Boolean = false;
  
  eventCapture(event) {
    this.ShowPin = false;
    this.Pin=event;
  }
}
