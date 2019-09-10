import { Component } from '@angular/core';
import { PostProvider } from 'providers/postprovider';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  flag:boolean = false;
  s_msrno:any;
  countNOtif:any=0;
  constructor(public postPvdr:PostProvider,public storages:Storage) {}

  getNotif(){
      this.countNOtif =0;
    return new Promise(resolve => {
      let body = {
        aksi: 'readNotif',
        msrno: this.s_msrno,
      };
      this.postPvdr.postData(body, 'process-api.php').subscribe(async data => {

        this.countNOtif = data['count'];
      
        console.log(this.countNOtif);
          if(this.countNOtif <= 0 ){
              this.flag=false;
          }else{
              this.flag=true;
          }
        // for (let report of data.trading) {
      
        // }

      });
    });
    
 
  }

  ngOnInit(){

    this.storages.get('msrno').then((val) => {
      this.s_msrno = val;
     this.getNotif();
     });
 
   setInterval(() => {
     this.getNotif();
     }, 60000);
    
  
  }



}
