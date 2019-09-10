import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { PostProvider } from 'providers/postprovider';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-cashout',
  templateUrl: './cashout.page.html',
  styleUrls: ['./cashout.page.scss'],
})
export class CashoutPage implements OnInit {
  amount:any="";
  id;
  constructor(public toastController:ToastController, private activatedRoute: ActivatedRoute, private postPvdr:PostProvider, private router:Router, private storage: Storage) { }
  total=0.00;
  outlet= "TBD";
  funds=0;
  message="Estimated Delivery Time: TBD";
  type="";
  ngOnInit() {
   
  }
  ionViewDidEnter(){
    
    this.storage.get('msrno').then((val) => {
      this.id = val;
      this.getbal();
    });
  

    this.outlet = this.activatedRoute.snapshot.paramMap.get('bank');
    this.type=this.activatedRoute.snapshot.paramMap.get('type');
    
  }
  limit(){
    this.total=this.amount;
    if(this.total==0 || this.total==null){
      this.total=0.00;
    }
    if(this.amount>50000){
      this.presentToast('Maximum Cash-out for this outlet is P50,000.00');
    }
  }
  async presentToast(mess) {
    const toast = await this.toastController.create({
      message: mess,
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }
  cashout(){
   this.presentToast('Coming Soon');
    // var y = +this.funds;
    
    // if (this.amount < 50) {
    //   this.presentToast('Minimum Cash-out  is P50.00');
    // }else if(this.amount>50000){
    //   this.presentToast('Maximum Cash-out for this outlet is P50,000.00');
    // }else {
    //   if (this.amount < this.funds) {
    //     const route = 'cashoutinfo/' + this.outlet+'/'+ this.amount+'/'+this.type ;
        
    //     this.router.navigateByUrl(route);
    //   }else{
    //     this.presentToast('Not Enough Funds. You have only P'+ y.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
    //   }
    // }
  }
  
  getbal(){
    return new Promise(resolve => {
      let body = {
        aksi : 'getAvailFunds',
        msrno : this.id,

      };
      this.postPvdr.postData(body, 'process-api.php').subscribe(data => {
        this.funds = data['availablefunds']['balance'];
        resolve(true);
      });
    });
  }
}
