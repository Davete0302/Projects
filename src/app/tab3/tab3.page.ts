import { Component, ViewChild, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { PostProvider } from 'providers/postprovider';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  
  @ViewChild('doughnutCanvas') doughnutCanvas;
  @ViewChild('doughnutCanvas1') doughnutCanvas1;
  @ViewChild('lineCanvas') lineCanvas;
  @ViewChild('lineCanvas1') lineCanvas1;
  @ViewChild('trial') trial;
  @ViewChild('barCanvas') barCanvas;
  @ViewChild('exchange') exchange;
  @ViewChild('trade') trade;
  @ViewChild('sendoro') sendoro;
  id;
  barChart: any;
  doughnutChart: any;
  lineChart: any;
  escrowchart: any;
  generationcr: any = [];
  generationdr: any = [];
  generationdate: any = [];
  cr: any = [];
  dr: any = [];
  date: any = [];
  referraldate: any = [];
  referralcount: any = [];
  investmentdate: any = [];
  investmentcoin: any = [];
  investmentinterest: any = [];
  withdrawcounts: any = [];
  withdrawstatus: any = [];
  convertdr: any = [];
  convertdate: any = [];
  detailsoro: any = [];
  detailsdate: any = [];
  tradeoro: any = [];
  tradeprice: any = [];
  tradedate: any = [];
  sendorodate: any = [];
  sendorocr: any = [];
  sendorodr: any = [];
  isLoading = false;
  breferral=true;
  bEscrow=true;
  bIncome=true;
  bWithdrawal=true;
  bWallet=true;
  bConvert=true;
  bSold=true;
  bBought=true;
  bsend=true;
  constructor(private postPvdr: PostProvider, public loadingController: LoadingController,private storages: Storage ) { }
  
  send(){
     
    return new Promise(resolve => {
      let body = {
        aksi : 'sendSMS'
      };
  
      this.postPvdr.postData(body, 'api_post.php').subscribe(data => {
     
      });
    });
  }


  ngOnInit() {
    
  }
  clear(){
    this.generationcr= [];
    this.generationdr=[];
    this.generationdate=[];
    this.cr= [];
    this.dr=[];
    this.date= [];
    this.referraldate=[];
    this.referralcount= [];
    this.investmentdate= [];
    this.investmentcoin=[];
    this.investmentinterest= [];
    this.withdrawcounts= [];
    this.withdrawstatus= [];
    this.convertdr=[];
    this.convertdate= [];
    this.detailsoro= [];
    this.detailsdate= [];
    this.tradeoro= [];
    this.tradeprice= [];
    this.tradedate=[];
    this.sendorodate= [];
    this.sendorocr= [];
    this.sendorodr= [];
  }
  ionViewDidEnter(){
    this.clear();
    this.present();
    this.breferral=true;
    this.bEscrow=true;
    this.bIncome=true;
    this.bWithdrawal=true;
    this.bWallet=true;
    this.bConvert=true;
    this.bSold=true;
    this.storages.get('msrno').then((val) => {
      this.id = val;
      this.graphreferral();
      this.graphinvestmnet();
      this.graphgeneration();
      this.graphwithdraw();
      this.graphincome();
      this.graphconvert();
      this.graphexchange();
      this.graphtrading();
      this.graphsendoro();
    });
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
  graphreferral(){
    
    return new Promise(resolve => {
      let body = {
        aksi : 'referralgraph',
        id : this.id,
      };
      let i =0
      this.postPvdr.postData(body, 'proses-api.php').subscribe(data => {
        for(let report of data.result) {
          i++;
          this.referraldate.push(report.dt);
          this.dismiss();
          this.referralcount.push(report.nums);
          if(report.stats==='done'){
            this.barChartMethod();
          }
        }if(i===0){
          this.breferral=false;
        }
        resolve(true);
      });
    });
  }
  graphinvestmnet(){
    
    return new Promise(resolve => {
      let body = {
        aksi : 'investmentgraph',
        id : this.id,
      };
      let i =0;
      this.postPvdr.postData(body, 'proses-api.php').subscribe(data => {
        for(let report of data.result) {
          i++;
          this.dismiss();
          this.investmentdate.push(report.dt);
          this.investmentcoin.push(report.coin);
          this.investmentinterest.push(report.interest);
          if(report.stats==='done'){
            this.Escrow();
          }  
        }if(i===0){
          this.bEscrow=false;
        }
        resolve(true);
      });
    });
  }
  graphgeneration(){
    return new Promise(resolve => {
      let body = {
        aksi : 'generationgraph',
        id : this.id,
      };
      let i =0;
      this.postPvdr.postData(body, 'proses-api.php').subscribe(data => {
        for(let report of data.result) {
          i++;
          this.dismiss();
          this.generationdr.push(report.dr);
          this.generationcr.push(report.cr);
          this.generationdate.push(report.dt);
          if(report.stats==='done'){
            this.generation();
          }
        }if(i===0){
          this.bIncome=false;
        }
        resolve(true);
      });
    });
  }
  graphwithdraw(){
    
    return new Promise(resolve => {
      let body = {
        aksi : 'withdrawgraph',
        id : this.id,
      };
      let i =0;
      this.postPvdr.postData(body, 'proses-api.php').subscribe(data => {
        for(let report of data.result) {
          i++;
          this.dismiss();
          this.withdrawstatus.push(report.Status);
          this.withdrawcounts.push(report.counts);
          if(report.stats==='done'){
            this.doughnutChartMethod();
          }
        }
        if(i===0){
          this.bWithdrawal=false;
        }
        resolve(true); 
      });
    });
  }
  graphincome(){
    
    return new Promise(resolve => {
      let body = {
        aksi : 'incomegraph',
        id : this.id,
      };
      let i =0;
      this.postPvdr.postData(body, 'proses-api.php').subscribe(data => {
        for(let report of data.result) {
          i++;
          this.dismiss();
          this.dr.push(report.dr);
          this.cr.push(report.cr);
          this.date.push(report.dt);
          if(report.stats==='done'){
            this.lineChartMethod();
          }
        }if(i===0){
          this.bWallet=false;
        }
        resolve(true);
      });
    });
  }
  graphconvert(){
    
    return new Promise(resolve => {
      let body = {
        aksi : 'convertgraph',
        id : this.id,
      };
      let i =0;
      this.postPvdr.postData(body, 'proses-api.php').subscribe(data => {
        for(let report of data.result) {
          i++;
          this.dismiss();
          this.convertdr.push(report.dr);
          this.convertdate.push(report.date);
          if(report.stats==='done'){
            this.convert();
          }
          
        }if(i===0){
          this.bConvert=false;
        }
        resolve(true);
      });
    });
  }
  
  graphexchange(){
    
    return new Promise(resolve => {
      let body = {
        aksi : 'exchange_details',
        id : this.id,
      };
      let i=0;
      this.postPvdr.postData(body, 'proses-api.php').subscribe(data => {
        for(let report of data.result) {
          i++;
          this.dismiss();
          this.detailsoro.push(report.oro);
          this.detailsdate.push(report.date);
          if(report.stats==='done'){
            this.exchange_details();
            this.dismiss();
          }
        }if(i===0){
          this.bBought=false;
          
        }
        resolve(true);
      });
    });
  }
  graphtrading(){
    
    return new Promise(resolve => {
      let body = {
        aksi : 'exchange',
        id : this.id,
      };
      let i =0;
      this.postPvdr.postData(body, 'proses-api.php').subscribe(data => {
        for(let report of data.result) {
          i++;
          this.dismiss();
          this.tradeoro.push(report.oro);
          this.tradeprice.push(report.price);
          this.tradedate.push(report.date);
          if(report.stats==='done'){
            this.trading();
            this.dismiss();
          }
        }if(i===0){
          this.bSold=false;
        
        }
        resolve(true);
      });
    });
  }
  graphsendoro(){
    
    return new Promise(resolve => {
      let body = {
        aksi : 'sendorograph',
        id : this.id,
      };
      let i =0;
      this.postPvdr.postData(body, 'proses-api.php').subscribe(data => {
        for(let report of data.result) {
          i++;
          this.sendorodate.push(report.dt);
          this.sendorocr.push(report.cr);
          this.sendorodr.push(report.dr);
          this.dismiss();
          
          if(report.stats==='done'){
            this.sendoros();
            this.dismiss();
          }
        }if(i===0){
          this.bsend=false;
          this.dismiss();
        
        }
        resolve(true);
      });
    });
  }
  exchange_details() {
    this.lineChart = new Chart(this.exchange.nativeElement, {
      type: "line",
      data: {
        labels: this.detailsdate,
        datasets: [
          {
            label: "Bought",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "lime",
            borderColor: "lime",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "lime",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 2,
            pointHoverRadius: 4,
            pointHoverBackgroundColor: "lime",
            pointHoverBorderColor: "lime",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.detailsoro,
            
            spanGaps: false
          }
        ]
      }
    });
  }
  
  barChartMethod() {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: this.referraldate,
        datasets: [{
          label: 'Referred',
          data: this.referralcount,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

trading() {
  this.barChart = new Chart(this.trade.nativeElement, {
    type: 'bar',
    data: {
      labels: this.tradedate,
      datasets: [{
        label: 'Sold Oro',
        data: this.tradeoro,
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(75, 192, 192, 0.2)'
        ],
        borderColor: [
          'rgba(75, 192, 192, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(75, 192, 192, 0.2)'
        ],
        borderWidth: 1
      }
    ]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
});
}
Escrow() {
  this.barChart = new Chart(this.trial.nativeElement, {
    type: 'bar',
    data: {
      labels: this.investmentdate,
      datasets: [{
        label: 'Coin',
        data: this.investmentcoin,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 159, 64, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255,99,132,1)'
        ],
        borderWidth: 1
      },{
        label: 'Interest',
        data: this.investmentinterest,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }
    ]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
});
}

doughnutChartMethod() {
  this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
    type: 'doughnut',
    data: {
      labels: this.withdrawstatus,
      datasets: [{
        label: '# of Votes',
        data: this.withdrawcounts,
        backgroundColor: [
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)'
        ],
        hoverBackgroundColor: [
          '#FFCE56',
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#FF6384'
        ]
      }]
    }
  });
}
convert() {
  this.doughnutChart = new Chart(this.doughnutCanvas1.nativeElement, {
    
    type: 'polarArea',
    data: {
      labels: this.convertdate,
      datasets: [{
        label: '# of Votes',
        data: this.convertdr,
        backgroundColor: [
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)'
        ],
        hoverBackgroundColor: [
          '#FFCE56',
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#FF6384'
        ]
      }]
    }
  });
}
generation() {
  this.lineChart = new Chart(this.lineCanvas1.nativeElement, {
    type: "line",
    data: {
      labels: this.generationdate,
      datasets: [
        {
          label: "Total Debit",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "green",
          borderColor: "green",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "black",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 2,
          pointHoverRadius: 4,
          pointHoverBackgroundColor: "green",
          pointHoverBorderColor: "green",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.generationdr,
          
          spanGaps: false
        },
        {
          label: "Total Credit",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "red",
          borderColor: "red",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "black",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 2,
          pointHoverRadius: 4,
          pointHoverBackgroundColor: "red",
          pointHoverBorderColor: "red",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.generationcr,
          
          spanGaps: false
        }
      ]
    }
  });
}
sendoros() {
  this.lineChart = new Chart(this.sendoro.nativeElement, {
    type: "line",
    data: {
      labels: this.sendorodate,
      datasets: [
        {
          label: "Sent ORO",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "green",
          borderColor: "green",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "black",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 2,
          pointHoverRadius: 4,
          pointHoverBackgroundColor: "green",
          pointHoverBorderColor: "green",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.sendorodr,
          
          spanGaps: false
        },
        {
          label: "Received ORO",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "red",
          borderColor: "red",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "black",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 2,
          pointHoverRadius: 4,
          pointHoverBackgroundColor: "red",
          pointHoverBorderColor: "red",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.sendorocr,
          
          spanGaps: false
        }
      ]
    }
  });
}
lineChartMethod() {
  this.lineChart = new Chart(this.lineCanvas.nativeElement, {
    type: "line",
    data: {
      labels: this.date,
      datasets: [
        {
          label: "Total Debit",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "green",
          borderColor: "green",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "black",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 2,
          pointHoverRadius: 4,
          pointHoverBackgroundColor: "green",
          pointHoverBorderColor: "green",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.dr,
          
          spanGaps: false
        },
        {
          label: "Total Credit",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "red",
          borderColor: "red",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "black",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 2,
          pointHoverRadius: 4,
          pointHoverBackgroundColor: "red",
          pointHoverBorderColor: "red",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.cr,
          
          spanGaps: false
        }
      ]
    }
  });
}}