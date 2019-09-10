import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PostProvider } from 'providers/postprovider';
import { IonInfiniteScroll, AlertController } from '@ionic/angular';
import { IonContent } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonContent) content: IonContent;
  topup: any = [];
  limit: number = 20;
  start: number = 0;
  id;
  bool = 0;
  counts = 0;
  runtimes = 0;
  storage;
  noRecord = false;
  totalcredit = 0;
  totaldebit = 0;
  sortby: any = 'ondate';
  by: any = 'Desc';
  controller=false;
  hide=false;
  hide1=true;
  isLoading = false;
  constructor(private postPvdr: PostProvider, private router: Router, private activatedRoute: ActivatedRoute, private storages: Storage  ,
    public loadingController: LoadingController,private alertCtrl: AlertController) { }
    
    ngOnInit() {
      this.storages.get('msrno').then((val) => {
        this.id = val;
        this.topup = [];
        this.start = 0;
        this.limit = 20;
        this.present();
        this.loadReport();
      });
      
    }
    DownloadPDF(){
      const route= 'download-report/' + 'wallet';
      this.router.navigateByUrl(route);
    }
    loadReport() {
      return new Promise(resolve => {
        let body = {
          aksi : 'topup',
          limit : this.limit,
          start : this.start,
          id : this.id,
          counts: this.counts,
          sort: this.sortby,
          by: this.by
        };
        this.postPvdr.postData(body, 'proses-api.php').subscribe(data => {
          for (let report of data.result) {
            this.dismiss();
            this.hide=false;
            this.hide1=false;
            this.topup.push(report);
            this.totalcredit =  report.totalcr;
            this.totaldebit = report.totaldr;
            this.bool = 1;
            this.counts = report.counter;
            if (this.runtimes === 0 ) {
              this.runtimes = report.rowcount;
            }
            this.storage = report.rowcount;
          }
          if (this.bool === 0) {
            this.dismiss();
            const route = 'noreport';
            this.router.navigateByUrl(route);
          }
          resolve(true);
        });
      });
    }
    loadData(event) {
      if (this.runtimes % 1 !== 0) {
        this.runtimes+1;
        this.storage+1;
      }
      this.runtimes = this.runtimes - 1;
      if (this.runtimes < 0) {
        this.noRecord = true;
        this.hide=false;
        this.hide1=true;
      }else{
        this.hide=true;
        this.hide1=true;
        
      }
      setTimeout(() => {
        this.start+=20;
        this.loadReport();
        
      }, 2000);
    }
    doRefresh(event) {
      
      this.topup = [];
      this.start = 0;
      this.limit = 20;
      this.counts = 0;
      this.noRecord = false;
      this.runtimes = this.storage;
      this.present();
      this.loadReport();
      event.target.complete();
      
    }
    onChange(value) {
      this.topup = [];
      this.start = 0;
      this.limit = 20;
      this.counts = 0;
      this.noRecord = false;
      this.runtimes = this.storage;
      this.present();
      this.loadReport();
      
    }
    onChange1(value) {
      this.topup = [];
      this.start = 0;
      this.limit = 20;
      this.counts = 0;
      this.noRecord = false;
      this.runtimes = this.storage;
      this.present();
      this.loadReport();
      
    }
    scroll(ev) {
      if(ev.detail.scrollTop>800 && this.controller===false){
        this.controller=true;
      }else if(ev.detail.scrollTop<800 && this.controller===true){
        this.controller=false;
      }
    }
    ScrollToTop(){
      this.content.scrollToTop(1000);
    }
    async present() {
      this.isLoading = true;
      return await this.loadingController.create({
        cssClass: 'custom-loader',
        spinner: null
      }).then(a => {
        a.present().then(() => {
          
          if (!this.isLoading) {
            a.dismiss();
          }
        });
      });
    }
    
    async dismiss() {
      if(this.isLoading === true) {
        this.isLoading = false;
        return await this.loadingController.dismiss();
      }
      
    }
    async notifications(ref,cr,dr,date,time,desc,ev: any) {

      let hold;
      if(dr==0){
        hold='-'+parseFloat(cr);
      }else{
        hold='+'+parseFloat(dr);
      } 
      this.alertCtrl.create({
        cssClass:'scaledAlert',
        message: '<center style="color:black;">' + desc+'</center> <center>Date & Time: ' 
        + date +' | ' + time+ '</center><center>Amount: '+ hold+'<center>Reference Number: ' + ref+'</center>', 
        
        buttons: [
          {
            text: 'Okay',
          }
        ]
      }).then(alertEl => {
        alertEl.present();
      });
    }
  }
  