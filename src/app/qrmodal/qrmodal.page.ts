import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Storage } from '@ionic/storage';
import { PostProvider } from 'providers/postprovider';
@Component({
  selector: 'app-qrmodal',
  templateUrl: './qrmodal.page.html',
  styleUrls: ['./qrmodal.page.scss'],
})
export class QrmodalPage implements OnInit {

  // qrData = "Vincent Dave Te";
  createdCode = null;ax
  scannedCode = null;
  s_msrno: any;
  hide: boolean = true;
  prewallet: any;
  tp:any;
  constructor(private modalCtrl: ModalController,public navParams:NavParams, private barcodeScanner: BarcodeScanner, private storages: Storage,private postPvdr: PostProvider) { }
  
  ngOnInit() {

    this.storages.get('msrno').then((val) => {
      this.s_msrno = val;
      this.tp = this.navParams.get('tp');
      this.displaywallet();
    
    });
 
    // this.createCode();
  }
  
  async displaywallet(){
    this.hide = true;
    // console.log(this.s_msrno);
    return new Promise( resolve => {
      let body = {
        aksi: 'getwalletadd2',
        msrno: this.s_msrno,
        type:this.tp
      };
      this.postPvdr.postData(body, 'process-api.php').subscribe(data=>{
        console.log(data);
        this.prewallet = data['wallet']['value'];
        this.createCode(this.prewallet);
      });
      
    });
  }

  createCode(vars){
    this.createdCode = vars;
    this.hide = false;
  }
  
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
  
  // scanCode(){
  //   this.barcodeScanner.scan().then(barcodeData => {
  //     this.scannedCode = barcodeData.text;
  //   });
  // }

}
