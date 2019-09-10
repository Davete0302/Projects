import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PostProvider } from 'providers/postprovider';
import { IonInfiniteScroll } from '@ionic/angular';
import { IonContent } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-boughoro',
  templateUrl: './boughoro.page.html',
  styleUrls: ['./boughoro.page.scss'],
})
export class BoughoroPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonContent) content: IonContent;
  referral: any = [];
  limit: number = 20;
  start: number = 0;
  id;
  bool = 0;
  counts = 0;
  runtimes = 0;
  storage;
  noRecord = false;
  sortby: any = 'o.ondate';
  by: any = 'Desc';
  hide=false;
  hide1=true;
  controller=false;
  isLoading = false;
  constructor(private postPvdr: PostProvider, private router: Router, private activatedRoute: ActivatedRoute , public loadingController: LoadingController, public storages: Storage) { }
    ngOnInit() {
      this.storages.get('msrno').then((val) => {
        this.id = val;
        this.referral = [];
        this.start = 0;
        this.limit = 20;
        this.present()
        this.loadReport();
      });
    }
    
    
    ionViewDidLoad() {}
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
    
    DownloadPDF(){
      const route= 'download-report/' + 'boughoro';
      this.router.navigateByUrl(route);
    }
    loadReport() {
      return new Promise(resolve => {
        let body = {
          aksi : 'bought',
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
            this.referral.push(report);
            this.bool = 1;
            this.counts = report.counter;
            if (this.runtimes === 0 ){
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
      this.referral = [];
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
      this.referral = [];
      this.start = 0;
      this.limit = 20;
      this.counts = 0;
      this.noRecord = false;
      this.runtimes = this.storage;
      this.present();
      this.loadReport();
      
    }
    onChange1(value) {
      this.referral = [];
      this.start = 0;
      this.limit = 20;
      this.counts = 0;
      this.noRecord = false;
      this.runtimes = this.storage;
      this.present();
      this.loadReport();
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
    
}