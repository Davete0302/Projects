import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ModalController } from '@ionic/angular';
import { SendoroPage } from '../sendoro/sendoro.page';

@Component({
  selector: 'app-qrscanner',
  templateUrl: './qrscanner.page.html',
  styleUrls: ['./qrscanner.page.scss'],
})
export class QrscannerPage implements OnInit {


  scannedCode:any;
  constructor(private modalCtrl: ModalController,private barcodeScanner: BarcodeScanner) { }

  ngOnInit() {
    this.scanCode();

    
    
  }
  ionViewDidEnter(){
  
   
  }

  scanCode(){
      this.barcodeScanner.scan().then(barcodeData => {
        this.scannedCode = barcodeData.text;
          


        


      });
    }

    async openSend(scann) {
      const modal = await this.modalCtrl.create({
        component: SendoroPage,
        componentProps: {
          'walletadd': scann,
        
       
        }

       
      });
      
      return await  modal.present();
     
    }
   dismiss() {
      
      this.modalCtrl.dismiss({
        'dismissed': true
      });
    }

}
