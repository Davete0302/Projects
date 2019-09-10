import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import * as moment from 'moment';
import { PostProvider } from 'providers/postprovider';
import { Storage } from '@ionic/storage';
import { AlertController, ToastController, PopoverController, LoadingController, ModalController } from '@ionic/angular';
import { ModalbuyPage } from '../modalbuy/modalbuy.page';
import { RequestPage } from '../request/request.page';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  display: any;
  samples = 10;
  speed = 250;
  timeout = this.samples * this.speed;
  values: any = [];
  labels: any = [];
  charts: any = [];
  value = 0;
  scale = 1;
  oro:any;
  curr_oro:any;
  ppo:any;
  myDate: String = new Date().toISOString();
  err:any;
  prompt:any;
  status:any;
  exc_id:any;
  availability:any;
  availability2:string;
  hideform: boolean = false;
  s_msrno:any;
  hides: boolean = false;
  timer: number = 60;
  datareading: any = [];
  progress: any=0.00;
  holdatetime:any;
  private loading;
  date:Date;
  show = true;
  limit: number = 20;
  start: number = 0;
  hide=false;
  hide1=true;
  time1:any;
  returned_endate:any;
  runtimes = .0000000001;
  storage;
  noRecord = false;
  refresh: any= 60000;
  rate:any=0;
  searchprice:any;
  originalCalculateXLabelRotation = Chart.Scale.prototype.calculateXLabelRotation;
  constructor(public postPvdr: PostProvider,public storages:Storage,
    private alertController: AlertController, private toastctrl: ToastController, 
    private popoverController: PopoverController, private loadingctrl: LoadingController,
    private modalctrl: ModalController) {
    }
    
    //
    
    myTime = '1'; 
    // (please assign time with proper format which is describe below)
    timePickerObj = {
      inputTime: '13:01', // for 12 hour time in timePicker
      timeFormat: 'hh:mm', // default 'hh:mm A'
      setLabel: 'Set', // default 'Set'
      closeLabel: 'Close', // default 'Close'
      titleLabel: 'Select a Time', // default 'Time'
      clearButton: false, // default true
      btnCloseSetInReverse: true, // default false
      momentLocale: 'pt-BR', //  default 'en-US'
      
      btnProperties: {
        expand: '', // "block" | "full" (deafault 'block')
        fill: '', // "clear" | "default" | "outline" | "solid" 
        // (deafault 'solid')
        size: '', // "default" | "large" | "small" (deafault 'default')
        disabled: '', // boolean (default false)
        strong: '', // boolean (default false)
        color: ''
        // "primary", "secondary", "tertiary", "success", 
        // "warning", "danger", "light", "medium", "dark" , 
        // and give color in string (default 'primary')
      }
    };
    
    //
    async openRequest() {
      const modal = await this.modalctrl.create({
        component: RequestPage,
        componentProps: {
          'msrid': this.s_msrno,
          
        }
      });
      return await modal.present();
    }
    
    
    showLoader() {
      this.loading = this.loadingctrl.create({
        message: 'Loading...'
      }).then((res) => {
        res.present();
        
        res.onDidDismiss().then((dis) => {
        });
      });
      
    }
    
    hideLoader() {
      setTimeout(() => {
        this.loadingctrl.dismiss();
      }, 2000);
    }
    seemore(event) {
      this.timer = 60;
      this.progress = 0.00;
      this.refresh=60000;
      
      if (this.runtimes % 1 !== 0) {
        this.runtimes+1;
        this.storage+1;
      }
      this.runtimes = this.runtimes - 1;
      console.log(this.runtimes);
      if (this.runtimes < 0) {
        this.noRecord = true;
        this.hide=false;
        this.hide1=true;
        this.start=0;
      }else{
        this.hide=true;
        this.hide1=true;
        
      }
      setTimeout(() => {
        this.start+=20;
        this.getTradingData('');
        
      }, 2000);
    }
    
    async getrate(){ // oro rate get data method
      return new Promise(resolve => {
        let body = {
          aksi: 'getrate',
        };
        this.postPvdr.postData(body, 'process.php').subscribe(async data => {
          this.rate = data['oro'];
          console.log( data['oro']);
        });
      });
    }
    
    onSearch(){
      if(this.searchprice==''||this.searchprice==null||this.searchprice==""){
        this.datareading = [];
        this.show = true;
        this.getTradingData('');
        this.start=0;
      }else{
        this.seartrading(this.searchprice);
      }
    }
    
    seartrading(search){
      this.datareading = [];
      return new Promise(resolve => {
        this.show = true;
        let body = {
          aksi: 'readTrading2',
          msrno: this.s_msrno,
          limit : this.limit,
          start : this.start,
          search: search
        };
        this.postPvdr.postData(body, 'process-api.php').subscribe(async data => {
          
          for (let report of data.trading) {
            this.datareading.push(report);
          }
          this.show = false;
        });
      });
    }
    getTradingData(search){
      
      return new Promise(resolve => {
        this.show = true;
        let body = {
          aksi: 'readTrading',
          msrno: this.s_msrno,
          limit : this.limit,
          start : this.start,
          search: search
        };
        this.postPvdr.postData(body, 'process-api.php').subscribe(async data => {
          
          for (let report of data.trading) {
            this.datareading.push(report);
            this.hide=false;
            this.hide1=false;
            if (this.runtimes === .0000000001 ){
              this.runtimes = report.rowcount;
            }
            this.storage = report.rowcount;
          }
          
          this.show = false;
          console.log(this.datareading);
        });
      });
      
    }
    async cancelBid(id){
      
      return new Promise(resolve => {
        let body = {
          aksi: 'cancelBid',
          msrno: this.s_msrno,
          exc_id: id
        };
        this.postPvdr.postData(body, 'process-api.php').subscribe(async data => {
          console.log(data);
          this.searchprice="";
          this.datareading=[];
          this.getTradingData('');
          this.start=0;
          this.hideLoader();

        });
      });
      
    }
    
    async dashboard(){ // dashboard get data method
      return new Promise(resolve => {
        let body = {
          aksi: 'dashboard',
          msrno: this.s_msrno
        };
        this.postPvdr.postData(body, 'process.php').subscribe(async data => {
          console.log(data);
          this.curr_oro = data['results']['oro'];
          console.log(this.curr_oro);
          
          // this.getnews();
          // this.refname = this.username;
        });
      });
    }
    
    async showLongToast(message) { // show toast message
      const toast = await this.toastctrl.create({
        message: message,
        duration: 3000,
        position: 'bottom',
        color: 'medium',
        showCloseButton: true,
        closeButtonText: 'Got it!',
        cssClass: "toaster",
      });
      toast.present();
      // this.reset();
    }
    
    openForm(){
      if (this.hideform === true) {
        this.hideform = false;
      }else{
        this.hideform = true;
      }
    }
    
    clear(){
      this.availability="";
      this.oro="";
      this.ppo="";
    }
    
    async presentAlert(message) {
      const alert = await this.alertController.create({
        header: 'Notice from Admin',
        message:  '<p><ion-icon name="alert"></ion-icon>&nbsp;'+message+'</p>',
        buttons: ['OK'],
        cssClass: "toaster",
      });
      await alert.present();
    }
    
    async checkORo(){
      this.date = new Date();
      
      this.date.setDate( this.date.getDate() );
      this.availability2=moment(this.date).format("YYYY-MM-DD HH:mm:ss");
      
      var startdate = moment(this.availability2);
      
      this.returned_endate = moment(startdate).add(this.myTime, 'hours').format("YYYY-MM-DD HH:mm:ss");;  
      
      
      
      if(this.oro == "" || this.ppo == "" || this.oro == null || this.ppo == null){
        if(this.oro <= 0){
          this.presentAlert("The minimum amount you can sell is 1 ORO");
          this.clear();
        }else if(this.ppo <= 0){
          this.presentAlert("Invalid Amount");
          this.clear();
        }else{
          this.presentAlert("Please fill in all the fields");
          this.clear();
        }
      }else{
        if(this.oro <= 0){
          this.presentAlert("The minimum amount you can sell is 1 ORO");
          this.clear();
        }else if(this.oro > 50){
          this.presentAlert("The maximum amount you can sell is 50 OROs");
          this.clear();
        }else{
          
          return new Promise(resolve => {
            let body = {
              aksi: 'addTrading',
              msrno: this.s_msrno,
              inputoro:this.oro,
              availability2:   this.returned_endate,
              avail_oro:this.curr_oro,
              ppo :  this.ppo,
              
            };
            this.postPvdr.postData(body, 'process-api.php').subscribe(async data => {
              
              this.prompt = data['prompt'];
              
              if(this.prompt == 'Invalid Amount'){
                this.presentAlert('Invalid Amount')
              }else{
                this.clear();
                this.showLongToast("Successful");
                this.hides = false;
                this.hideform = false;
                this.getTradingData('');
              } 
            });
          });
        }
      }
    }
    
    async presentPopover(ppo,oro,msrid,exc_id) {
      console.log("gago")
      const popover = await this.popoverController.create({
        component: ModalbuyPage,
       
        translucent: true,
        cssClass: 'custom-popover',
        componentProps:{key1:ppo,key2:oro,key3:msrid,key4:exc_id}
      });
      
      popover.onDidDismiss().then((data) => {
        this.dashboard();
      });
      return await popover.present();
    }
    
    async confirmCancel(data) {
      const alert = await this.alertController.create({
        header: 'Notice from Admin',
        message: 'Are you sure you want to Cancel this Bid ?',
        buttons: [
          {
            text: 'No',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Yes',
            handler: () => {
              this.showLoader();
              console.log('Yes clicked');
              this.cancelBid(data);
            }
          }
        ],
        cssClass: "toastercenter",
      });
      await alert.present();
    }
    
    ionViewDidEnter(){
      this.start = 0;
      this.datareading = [];
      // this.initialize();
      // addEmptyValues(this.values, this.samples, this.speed);
      // advance(this.values, this.scale, this.charts, this.value, this.speed, this.display);
      this.storages.get('msrno').then((val) => {
        this.s_msrno = val;
        this.getTradingData('');
        this.dashboard();
      });
      this.getrate();
    }
    
    ngOnInit(){
      setInterval(() => {
        this.datareading = [];
        this.getTradingData('');
        this.start=0;
        this.timer=60;
        this.progress=0.00;
      }, this.refresh);
      
      setInterval(() => {
        this.timer -= 1;
        this.progress += .0167;
      }, 1000);
    }
    
    // tslint:disable-next-line: no-trailing-whitespace
    initialize() {
      this.charts.push(new Chart(document.getElementById('chart0'), {
        type: 'line',
        data: {
          datasets: [{
            data: this.values,
            backgroundColor: 'rgba(233, 176, 23, 0.1)',
            borderColor: '#e9b017',
            borderWidth: 2,
            lineTension: 0.25,
            pointBorderColor: 'rgba(233, 176, 23, 1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(233, 176, 23, 1)',
            pointHoverBorderColor: 'rgba(233, 176, 23, 1)',
            pointHoverBorderWidth: 2,
            pointRadius: 2,
            pointHitRadius: 10
          }]
        },
        options: {
          responsive: true,
          animation: {
            duration: this.speed * 1.5,
            easing: 'linear'
          },
          legend: false,
          scales: {
            xAxes: [{
              type: 'time',
              display: true
            }],
            yAxes: [{
              ticks: {
                max: 100,
                min: 0
              }
            }]
          }
        }
      })
      );
    }
  }
  
  function addEmptyValues(arr, n, vars) {
    for (let i = 0; i < n; i++) {
      arr.push({
        x: moment().subtract((n - i) * vars, 'milliseconds').toDate(),
        y: null
      });
    }
  }
  
  function rescale(scales) {
    const padding = [];
    this.addEmptyValues(padding, 10);
    this.values.splice.apply(this.values, padding);
    scales++;
  }
  
  function updateCharts(s) {
    // tslint:disable-next-line: only-arrow-functions
    s.forEach(function(chart) {
      chart.update();
    });
  }
  
  function progress(vard, vars, dis) {
    const randomint = Math.floor(Math.random() * 100); 
    vard = Math.min(Math.max(vard + (0.1 - Math.random() / 5), -1), 1) + randomint;
    dis = vard;
    
    vars.push({
      x: new Date(),
      y: vard
    });
    vars.shift();
  }
  
  
  function advance(vars, scales, chart , varsi, spee , dis) {
    if (vars[0] !== null && scales < 4) {
      updateCharts(chart);
    }
    progress(varsi, vars, dis);
    updateCharts(chart);
    setTimeout(function() {
      advance(vars, scales, chart, varsi, spee, dis);
    }, 3000);
    
    
  }
  
  