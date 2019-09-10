import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import * as moment from 'moment';
import { PostProvider } from 'providers/postprovider';
import { NavController,Platform } from '@ionic/angular';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import {File} from '@ionic-native/file/ngx';
import { AlertController } from '@ionic/angular';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs=pdfFonts.pdfMake.vfs;
import { map, take, switchMap} from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-download-report',
  templateUrl: './download-report.page.html',
  styleUrls: ['./download-report.page.scss'],
})
export class DownloadReportPage implements OnInit {
  disabled=true;
  myDate;
  toDate;
  finalfromdate;
  finaltodate;
  id;
  totalcr;
  totaldr;
  pdfObj=null;
  container: any = [];
  withdrawtotal;
  total;
  title;
  isLoading = false;
  soldoro;
  totalbought
  totalsend;
  totalreceived;
  constructor(public actionSheetController: ActionSheetController, private postPvdr: PostProvider, public navCtrl: NavController,
    private plt: Platform, private file: File, private fileOpener: FileOpener, private alertCtrl: AlertController, private storages: Storage, 
    private router: Router, private activatedRoute: ActivatedRoute,public loadingController: LoadingController,public toastController: ToastController) { }
    
    ngOnInit() {
      this.storages.get('msrno').then((val) => {
        this.id = val;
        });
    }
    formatter(vals){
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'PHP',
        minimumFractionDigits: 2
      })
      
      let ok=formatter.format(vals);
      return ok;
    }
    
    async present() {
      this.isLoading = true;
      return await this.loadingController.create({
        message: 'Please wait...',
        translucent: true,
        spinner: 'crescent'
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
    getter() {
      this.present();
      let hold=0;
      this.container=[];
      this.title = this.activatedRoute.snapshot.paramMap.get('report');
      let send= '';
      if (this.title === 'referral') {
        send= 'pdfreferral';
      }else if(this.title === 'convert'){
        send= 'pdfconvert';
      }else if(this.title === 'investment'){
        send= 'pdfinvestment';
      } else if (this.title === 'withdraw'){
        send= 'pdfwithdraw';
      }else if (this.title === 'sold-oro'){
        send= 'pdf-oro';
      }else if (this.title === 'wallet'){
        send= 'pdfwallet';
      }else if (this.title === 'boughoro'){
        send= 'pdf-bought';
      }else if (this.title === 'sendreport'){
        send= 'pdfSend';
      }

      else{
        send= 'export';
        
      }
      return new Promise(resolve => {
        let body = {
          aksi : send,
          id : this.id,
          from: this.finalfromdate,
          to: this.finaltodate,
        };
        this.postPvdr.postData(body, 'proses-api.php').subscribe(data => {
          for (let report of data.result) {
            hold=1;
            this.container.push(report);
            if (report.stats==='done') {
              this.dismiss();
              if (this.title === 'referral') {
                this.createPdfref();
              }else if(this.title === 'convert'){
                this.total=report.total;
                this.createPdfconvert();
              }else if(this.title === 'investment'){
                this.createPdfinvest();
              } else if (this.title === 'withdraw'){
              this.withdrawtotal=report.total;
              this.createPdfWithdraw();
            }else if (this.title === 'wallet'){
              this.totalcr=report.totalcr;
              this.totaldr=report.totaldr;
              this.createPdfwallet();
            }
              else if (this.title === 'sold-oro'){
                this.soldoro=report.totaloro;
                this.pdfsold();
                
              }else if (this.title === 'boughoro'){
                this.totalbought=report.totaloro;
                console.log(this.totalbought);
                this.Pdfbought();
              }else if (this.title === 'sendreport'){
                this.totalsend=report.totaldr;
              this.totalreceived=report.totalcr;
              this.sendPDf();
              }else{
                this.totalcr=report.totalcr;
                this.totaldr=report.totaldr;
                this.createPdf();
                
              }
              
            }
          }  if(hold===0){
            this.dismiss();
            this.presentToastWithOptions();
          
          }
          resolve(true);
        });
      });
    }
    events() {
      const froms = moment(this.toDate).format('YYYY-MM-DD');
      const tos = moment(this.myDate).format('YYYY-MM-DD');
      this.finalfromdate = froms + ' 23:59:00';
      this.finaltodate = tos + ' 23:59:00';
    }
    async presentActionSheet() {
      const actionSheet = await this.actionSheetController.create({
        header: 'Select No. of Days',
        buttons: [{
          text: 'Last 7 Days',
          handler: () => {
            this.myDate = new Date().toDateString();
            let to = new Date();
            to.setDate(to.getDate() - 7);
            this.toDate= to.toDateString();
            this.disabled = false;
          }
        }, {
          text: 'Last 30 Days',
          handler: () => {
            this.myDate = new Date().toDateString();
            let to = new Date();
            to.setDate(to.getDate() - 30);
            this.toDate= to.toDateString();
            this.disabled = false;
          }
        }, {
          text: 'Last 90 Days', 
          handler: () => {
            this.myDate = new Date().toDateString();
            let to = new Date();
            to.setDate(to.getDate() - 90);
            this.toDate= to.toDateString();
            this.disabled = false;
          }
        }, {
          text: 'Last 365 Days', 
          handler: () => {
            this.myDate = new Date().toDateString();
            let to = new Date();
            to.setDate(to.getDate() - 365);
            this.toDate= to.toDateString();
            this.disabled = false;
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        }]
      });
      await actionSheet.present();
    }
    createPdf() {
      var items = this.container.map(function(item) {
        return [item.ref,item.descrp, item.amount, item.dt];
      });
      
      var docDefinition = {
        content: [
          { text: 'COIN DE ORO', style: 'header' },
          { text: new Date().toDateString(), alignment: 'right' },
          { text: 'From', style: 'subheader' },
          { text: this.myDate},
          { text: 'To', style: 'subheader' },
          { text: this.toDate},
          { text: 'Transaction History', style: 'subheader'},
          {
            style: 'itemsTable',
            table: {
              widths: [60,'*', 75, 75],
              body: [
                [ 
                  { text: 'Ref. No', style: 'itemsTableHeader' },
                  { text: 'Description', style: 'itemsTableHeader' },
                  { text: 'Amount', style: 'itemsTableHeader' },
                  { text: 'Date', style: 'itemsTableHeader' },
                ]
              ].concat(items)
            }
          },
          {
            style: 'totalsTable',
            table: {
              widths: ['*', 130, 130],
              body: [
                [
                  '',
                  '',
                  '',
                ],
                [
                  '',
                  'Total Sent: ',
                  this.formatter(this.totalcr),
                ],
                [
                  '',
                  'Total Received: ',
                  this.formatter(this.totaldr),
                ]
              ]
            },
            layout: 'noBorders'
          },
        ],
        styles: {
          header: {
            fontSize: 20,
            bold: true,
            margin: [0, 0, 0, 10],
            alignment: 'right'
          },
          subheader: {
            fontSize: 16,
            bold: true,
            margin: [0, 20, 0, 5]
          },
          itemsTable: {
            margin: [0, 5, 0, 15]
          },
          itemsTableHeader: {
            bold: true,
            fontSize: 13,
            color: 'black'
          },
          totalsTable: {
            bold: true,
            margin: [0, 30, 0, 0]
          }
        },
        defaultStyle: {
        }
      }
      
      this.pdfObj = pdfMake.createPdf(docDefinition);
      this.downloadPdf();
    }
    sendPDf() {
      var items = this.container.map(function(item) {
        return [item.ref,item.descrp, item.amount, item.note,item.dt];
      });
      
      var docDefinition = {
        content: [
          { text: 'COIN DE ORO', style: 'header' },
          { text: new Date().toDateString(), alignment: 'right' },
          { text: 'From', style: 'subheader' },
          { text: this.myDate},
          { text: 'To', style: 'subheader' },
          { text: this.toDate},
          { text: 'ORO', style: 'subheader'},
          {
            style: 'itemsTable',
            table: {
              widths: [60,'*', 75, 75, 75],
              body: [
                [ 
                  { text: 'Ref. No', style: 'itemsTableHeader' },
                  { text: 'Description', style: 'itemsTableHeader' },
                  { text: 'Amount', style: 'itemsTableHeader' },
                  { text: 'Note', style: 'itemsTableHeader' },
                  { text: 'Date', style: 'itemsTableHeader' },
                ]
              ].concat(items)
            }
          },
          {
            style: 'totalsTable',
            table: {
              widths: ['*', 130, 130],
              body: [
                [
                  '',
                  '',
                  '',
                ],
                [
                  '',
                  'Total Sent: ',
                  this.formatter(this.totalsend),
                ],
                [
                  '',
                  'Total Received: ',
                  this.formatter(this.totalreceived),
                ]
              ]
            },
            layout: 'noBorders'
          },
        ],
        styles: {
          header: {
            fontSize: 20,
            bold: true,
            margin: [0, 0, 0, 10],
            alignment: 'right'
          },
          subheader: {
            fontSize: 16,
            bold: true,
            margin: [0, 20, 0, 5]
          },
          itemsTable: {
            margin: [0, 5, 0, 15]
          },
          itemsTableHeader: {
            bold: true,
            fontSize: 13,
            color: 'black'
          },
          totalsTable: {
            bold: true,
            margin: [0, 30, 0, 0]
          }
        },
        defaultStyle: {
        }
      }
      
      this.pdfObj = pdfMake.createPdf(docDefinition);
      this.downloadPdf();
    }
    pdfsold() {
      
      var items = this.container.map(function(item) {
     
        return [item.ref,item.oro, item.price, item.date];
      });
      
      var docDefinition = {
        content: [
          { text: 'COIN DE ORO', style: 'header' },
          { text: new Date().toDateString(), alignment: 'right' },
          { text: 'From', style: 'subheader' },
          { text: this.myDate},
          { text: 'To', style: 'subheader' },
          { text: this.toDate},
          { text: 'Sold Oro History', style: 'subheader'},
          {
            style: 'itemsTable',
            table: {
              widths: [60, 75, 75,'*'],
              body: [
                [ 
                  { text: 'Ref. No', style: 'itemsTableHeader' },
                  { text: 'ORO', style: 'itemsTableHeader' },
                  { text: 'Price', style: 'itemsTableHeader' },
                  { text: 'Date', style: 'itemsTableHeader' },
                ]
              ].concat(items)
            }
          },
          {
            style: 'totalsTable',
            table: {
              widths: ['*', 130, 130],
              body: [
                [
                  '',
                  '',
                  '',
                ],
                [
                  '',
                  'Sold: ',
                  this.formatter(this.soldoro),
                ],
                [
                  '',
                  '',
                 '',
                ]
              ]
            },
            layout: 'noBorders'
          },
        ],
        styles: {
          header: {
            fontSize: 20,
            bold: true,
            margin: [0, 0, 0, 10],
            alignment: 'right'
          },
          subheader: {
            fontSize: 16,
            bold: true,
            margin: [0, 20, 0, 5]
          },
          itemsTable: {
            margin: [0, 5, 0, 15]
          },
          itemsTableHeader: {
            bold: true,
            fontSize: 13,
            color: 'black'
          },
          totalsTable: {
            bold: true,
            margin: [0, 30, 0, 0]
          }
        },
        defaultStyle: {
        }
      }
      
      this.pdfObj = pdfMake.createPdf(docDefinition);
      this.downloadPdf();
    }
    createPdfWithdraw() {
      
      var items = this.container.map(function(item) {
        return [item.ref,item.type, item.amount,item.st,item.dt];
      });
      
      var docDefinition = {
        content: [
          { text: 'COIN DE ORO', style: 'header' },
          { text: new Date().toDateString(), alignment: 'right' },
          { text: 'From', style: 'subheader' },
          { text: this.myDate},
          { text: 'To', style: 'subheader' },
          { text: this.toDate},
          { text: 'Transaction History', style: 'subheader'},
          {
            style: 'itemsTable',
            table: {
              widths: [60,100,'*', 75, 100],
              body: [
                [ 
                  { text: 'Ref. No', style: 'itemsTableHeader' },
                  { text: 'Type', style: 'itemsTableHeader' },
                  { text: 'Amount', style: 'itemsTableHeader' },
                  { text: 'Status', style: 'itemsTableHeader' },
                  { text: 'Date', style: 'itemsTableHeader' },
                ]
              ].concat(items)
            }
          },
          {
            style: 'totalsTable',
            table: {
              widths: ['*', 130, 130],
              body: [
                [
                  '',
                  '',
                  '',
                ],
                [
                  '',
                  'Total Withdraw: ',
                  this.formatter(this.withdrawtotal),
                ]
              ]
            },
            layout: 'noBorders'
          },
        ],
        styles: {
          header: {
            fontSize: 20,
            bold: true,
            margin: [0, 0, 0, 10],
            alignment: 'right'
          },
          subheader: {
            fontSize: 16,
            bold: true,
            margin: [0, 20, 0, 5]
          },
          itemsTable: {
            margin: [0, 5, 0, 15]
          },
          itemsTableHeader: {
            bold: true,
            fontSize: 13,
            color: 'black'
          },
          totalsTable: {
            bold: true,
            margin: [0, 30, 0, 0]
          }
        },
        defaultStyle: {
        }
      }
      
      this.pdfObj = pdfMake.createPdf(docDefinition);
      this.downloadPdf();
    }
    createPdfref() {
      
      var items = this.container.map(function(item) {
        return [item.ref,item.userid, item.fname, item.dt];
      });
      
      var docDefinition = {
        content: [
          { text: 'COIN DE ORO', style: 'header' },
          { text: new Date().toDateString(), alignment: 'right' },
          { text: 'From', style: 'subheader' },
          { text: this.myDate},
          { text: 'To', style: 'subheader' },
          { text: this.toDate},
          { text: 'Referral', style: 'subheader'},
          {
            style: 'itemsTable',
            table: {
              widths: [60, 125,'*', 75],
              body: [
                [ 
                  { text: 'Ref. No', style: 'itemsTableHeader' },
                  { text: 'Username', style: 'itemsTableHeader' },
                  { text: 'Name', style: 'itemsTableHeader' },
                  { text: 'Joined Date', style: 'itemsTableHeader' },
                ]
              ].concat(items)
            }
          },
          
        ],
        styles: {
          header: {
            fontSize: 20,
            bold: true,
            margin: [0, 0, 0, 10],
            alignment: 'right'
          },
          subheader: {
            fontSize: 16,
            bold: true,
            margin: [0, 20, 0, 5]
          },
          itemsTable: {
            margin: [0, 5, 0, 15]
          },
          itemsTableHeader: {
            bold: true,
            fontSize: 13,
            color: 'black'
          },
          totalsTable: {
            bold: true,
            margin: [0, 30, 0, 0]
          }
        },
        defaultStyle: {
        }
      }
      
      this.pdfObj = pdfMake.createPdf(docDefinition);
      this.downloadPdf();
    }
    createPdfconvert() {
      
      var items = this.container.map(function(item) {
        return [item.ref,item.Dr,  item.dt];
      });
      
      var docDefinition = {
        content: [
          { text: 'COIN DE ORO', style: 'header' },
          { text: new Date().toDateString(), alignment: 'right' },
          { text: 'From', style: 'subheader' },
          { text: this.myDate},
          { text: 'To', style: 'subheader' },
          { text: this.toDate},
          { text: 'Convert History', style: 'subheader'},
          {
            style: 'itemsTable',
            table: {
              widths: [60,'*', '*'],
              body: [
                [ 
                  { text: 'Ref. No', style: 'itemsTableHeader' },
                  { text: 'Amount', style: 'itemsTableHeader' },
                  { text: 'Joined Date', style: 'itemsTableHeader' },
                ]
              ].concat(items)
            }
          },
          {
            style: 'totalsTable',
            table: {
              widths: ['*', 130, 130],
              body: [
                [
                  '',
                  '',
                  '',
                ],
                [
                  '',
                  'Total Amount: ',
                  this.formatter(this.total),
                ],
                [
                  '',
                  ' ',
                  '',
                ]
              ]
            },
            layout: 'noBorders'
          },
        ],
        styles: {
          header: {
            fontSize: 20,
            bold: true,
            margin: [0, 0, 0, 10],
            alignment: 'right'
          },
          subheader: {
            fontSize: 16,
            bold: true,
            margin: [0, 20, 0, 5]
          },
          itemsTable: {
            margin: [0, 5, 0, 15]
          },
          itemsTableHeader: {
            bold: true,
            fontSize: 13,
            color: 'black'
          },
          totalsTable: {
            bold: true,
            margin: [0, 30, 0, 0]
          }
        },
        defaultStyle: {
        }
      }
      
      this.pdfObj = pdfMake.createPdf(docDefinition);
      this.downloadPdf();
    }
    createPdfinvest() {
      
      var items = this.container.map(function(item) {
        return [item.ref,item.coin, item.interest, item.name, item.escrowed];
      });
      
      var docDefinition = {
        content: [
          { text: 'COIN DE ORO', style: 'header' },
          { text: new Date().toDateString(), alignment: 'right' },
          { text: 'From', style: 'subheader' },
          { text: this.myDate},
          { text: 'To', style: 'subheader' },
          { text: this.toDate},
          { text: 'Investment History', style: 'subheader'},
          {
            style: 'itemsTable',
            table: {
              widths: [60, 100,100, 75,'*'],
              body: [
                [ 
                  { text: 'Ref. No', style: 'itemsTableHeader' },
                  { text: 'Escrow Coin', style: 'itemsTableHeader' },
                  { text: 'Interest', style: 'itemsTableHeader' },
                  { text: 'Days', style: 'itemsTableHeader' },
                  { text: 'Joined Date', style: 'itemsTableHeader' },
                ]
              ].concat(items)
            }
          },
          
        ],
        styles: {
          header: {
            fontSize: 20,
            bold: true,
            margin: [0, 0, 0, 10],
            alignment: 'right'
          },
          subheader: {
            fontSize: 16,
            bold: true,
            margin: [0, 20, 0, 5]
          },
          itemsTable: {
            margin: [0, 5, 0, 15]
          },
          itemsTableHeader: {
            bold: true,
            fontSize: 13,
            color: 'black'
          },
          totalsTable: {
            bold: true,
            margin: [0, 30, 0, 0]
          }
        },
        defaultStyle: {
        }
      }
      
      this.pdfObj = pdfMake.createPdf(docDefinition);
      this.downloadPdf();
    }
    downloadPdf() {
      if (this.plt.is('cordova')) {
        this.pdfObj.getBuffer((buffer) => {
          var blob = new Blob([buffer], { type: 'application/pdf' });
          // Save the PDF to the data Directory of our App
          this.file.writeFile(this.file.dataDirectory, 'CoinDeORO.pdf', blob, { replace: true }).then(fileEntry => {
            // Open the PDf with the correct OS tools
            this.fileOpener.open(this.file.dataDirectory + 'CoinDeORO.pdf', 'application/pdf');
          })
        });
      } else {
        // On a browser simply use download!
        this.pdfObj.download();
      }
    }
    createPdfwallet() {
      
      var items = this.container.map(function(item) {
        return [item.ref,item.descrp, item.amount, item.dt];
      });
      
      var docDefinition = {
        content: [
          { text: 'COIN DE ORO', style: 'header' },
          { text: new Date().toDateString(), alignment: 'right' },
          { text: 'From', style: 'subheader' },
          { text: this.myDate},
          { text: 'To', style: 'subheader' },
          { text: this.toDate},
          { text: 'Available Funds Transactions', style: 'subheader'},
          {
            style: 'itemsTable',
            table: {
              widths: [60,'*', 75, 75],
              body: [
                [ 
                  { text: 'Ref. No', style: 'itemsTableHeader' },
                  { text: 'Description', style: 'itemsTableHeader' },
                  { text: 'Amount', style: 'itemsTableHeader' },
                  { text: 'Date', style: 'itemsTableHeader' },
                ]
              ].concat(items)
            }
          },
          {
            style: 'totalsTable',
            table: {
              widths: ['*', 100, 100],
              body: [
                [
                  '',
                  '',
                  '',
                ],
                [
                  '',
                  'Total Sent: ',
                  this.formatter(this.totalcr),
                ],
                [
                  '',
                  'Total Received:',
                  this.formatter(this.totaldr),
                ]
              ]
            },
            layout: 'noBorders'
          },
        ],
        styles: {
          header: {
            fontSize: 20,
            bold: true,
            margin: [0, 0, 0, 10],
            alignment: 'right'
          },
          subheader: {
            fontSize: 16,
            bold: true,
            margin: [0, 20, 0, 5]
          },
          itemsTable: {
            margin: [0, 5, 0, 15]
          },
          itemsTableHeader: {
            bold: true,
            fontSize: 13,
            color: 'black'
          },
          totalsTable: {
            bold: true,
            margin: [0, 30, 0, 0]
          }
        },
        defaultStyle: {
        }
      }
      
      this.pdfObj = pdfMake.createPdf(docDefinition);
      this.downloadPdf();
    }
    async presentToastWithOptions() {
      const toast = await this.toastController.create({
        header: 'Note:',
        message: 'No Data',
        position: 'bottom',
        buttons: [
            {
            text: 'Done',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
      toast.present();
    }
    Pdfbought() {
      var items = this.container.map(function(item) {
        return [item.ref,item.oro, item.price, item.date];
      });
      
      var docDefinition = {
        content: [
          { text: 'COIN DE ORO', style: 'header' },
          { text: new Date().toDateString(), alignment: 'right' },
          { text: 'From', style: 'subheader' },
          { text: this.myDate},
          { text: 'To', style: 'subheader' },
          { text: this.toDate},
          { text: 'Transaction History', style: 'subheader'},
          {
            style: 'itemsTable',
            table: {
              widths: [60, 75, 75,'*'],
              body: [
                [ 
                  { text: 'Ref. No', style: 'itemsTableHeader' },
                  { text: 'ORO', style: 'itemsTableHeader' },
                  { text: 'Price', style: 'itemsTableHeader' },
                  { text: 'Date', style: 'itemsTableHeader' },
                ]
              ].concat(items)
            }
          },
          {
            style: 'totalsTable',
            table: {
              widths: ['*', 100, 100],
              body: [
                [
                  '',
                  '',
                  '',
                ],
                [
                  '',
                  'Total Bought: ',
                  this.totalbought,
                ],
                [
                  '',
                  '',
                 '',
                ]
              ]
            },
            layout: 'noBorders'
          },
        ],
        styles: {
          header: {
            fontSize: 20,
            bold: true,
            margin: [0, 0, 0, 10],
            alignment: 'right'
          },
          subheader: {
            fontSize: 16,
            bold: true,
            margin: [0, 20, 0, 5]
          },
          itemsTable: {
            margin: [0, 5, 0, 15]
          },
          itemsTableHeader: {
            bold: true,
            fontSize: 13,
            color: 'black'
          },
          totalsTable: {
            bold: true,
            margin: [0, 30, 0, 0]
          }
        },
        defaultStyle: {
        }
      }
      
      this.pdfObj = pdfMake.createPdf(docDefinition);
      this.downloadPdf();
    }
  }
  