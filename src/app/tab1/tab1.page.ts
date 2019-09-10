import { Component, OnInit, ViewChild } from '@angular/core';
import { PostProvider } from 'providers/postprovider';
import { ModalController, PopoverController, NavController, AlertController } from '@ionic/angular';
import { QrmodalPage } from '../qrmodal/qrmodal.page';
import { NewsdetailPage } from '../newsdetail/newsdetail.page';
import { Storage } from '@ionic/storage';
import { ConvertoroPage } from '../convertoro/convertoro.page';
import { BuyoroPage } from '../buyoro/buyoro.page';
import { TopupfundPage } from '../topupfund/topupfund.page';
import { TransferfundPage } from '../transferfund/transferfund.page';
import { ConvertPage } from '../convert/convert.page';
import { WithdrawPage } from '../withdraw/withdraw.page';
import { EscrowPage } from '../escrow/escrow.page';
import { SendoroPage } from '../sendoro/sendoro.page';
import { SendmenuPage } from '../sendmenu/sendmenu.page';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  @ViewChild('slides') slides;
  sample: any = "";
  gross: any = "";
  swallet: any = "";
  msrno: any = "";
  username: any = "";
  bankname: any = "";
  accountname: any = "";
  u_var:any="u";
  b_var:any="b";
  o_var:any="o";
  accountno: any = "";
  bitcoin: any = "";
  refname: any = "";
  news: any;
  oro: any;
  hide: boolean = true;
  hide2: boolean = true;
  topup: any = [];
  hidelist: boolean = false;
  slidesOpts1 = {
    slidesPerView: 1,
    coverflowEffect: {
      rotate: 30,
      stretch: 0,
      depth: 40,
      modifier: 1,
      slideShadows: true,
    },
    on: {
      beforeInit() {
        const swiper = this;
        
        swiper.classNames.push(`${swiper.params.containerModifierClass}coverflow`);
        swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);
        
        swiper.params.watchSlidesProgress = true;
        swiper.originalParams.watchSlidesProgress = true;
      },
      setTranslate() {
        const swiper = this;
        const {
          width: swiperWidth, height: swiperHeight, slides, $wrapperEl, slidesSizesGrid, $
        } = swiper;
        const params = swiper.params.coverflowEffect;
        const isHorizontal = swiper.isHorizontal();
        const transform$$1 = swiper.translate;
        const center = isHorizontal ? -transform$$1 + (swiperWidth / 2) : -transform$$1 + (swiperHeight / 2);
        const rotate = isHorizontal ? params.rotate : -params.rotate;
        const translate = params.depth;
        // Each slide offset from center
        for (let i = 0, length = slides.length; i < length; i += 1) {
          const $slideEl = slides.eq(i);
          const slideSize = slidesSizesGrid[i];
          const slideOffset = $slideEl[0].swiperSlideOffset;
          const offsetMultiplier = ((center - slideOffset - (slideSize / 2)) / slideSize) * params.modifier;
          
          let rotateY = isHorizontal ? rotate * offsetMultiplier : 0;
          let rotateX = isHorizontal ? 0 : rotate * offsetMultiplier;
          // var rotateZ = 0
          let translateZ = -translate * Math.abs(offsetMultiplier);
          
          let translateY = isHorizontal ? 0 : params.stretch * (offsetMultiplier);
          let translateX = isHorizontal ? params.stretch * (offsetMultiplier) : 0;
          
          // Fix for ultra small values
          if (Math.abs(translateX) < 0.001) translateX = 0;
          if (Math.abs(translateY) < 0.001) translateY = 0;
          if (Math.abs(translateZ) < 0.001) translateZ = 0;
          if (Math.abs(rotateY) < 0.001) rotateY = 0;
          if (Math.abs(rotateX) < 0.001) rotateX = 0;
          
          const slideTransform = `translate3d(${translateX}px,${translateY}px,${translateZ}px)  rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
          
          $slideEl.transform(slideTransform);
          $slideEl[0].style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;
          if (params.slideShadows) {
            // Set shadows
            let $shadowBeforeEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
            let $shadowAfterEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
            if ($shadowBeforeEl.length === 0) {
              $shadowBeforeEl = swiper.$(`<div class="swiper-slide-shadow-${isHorizontal ? 'left' : 'top'}"></div>`);
              $slideEl.append($shadowBeforeEl);
            }
            if ($shadowAfterEl.length === 0) {
              $shadowAfterEl = swiper.$(`<div class="swiper-slide-shadow-${isHorizontal ? 'right' : 'bottom'}"></div>`);
              $slideEl.append($shadowAfterEl);
            }
            if ($shadowBeforeEl.length) $shadowBeforeEl[0].style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0;
            if ($shadowAfterEl.length) $shadowAfterEl[0].style.opacity = (-offsetMultiplier) > 0 ? -offsetMultiplier : 0;
          }
        }
        
        // Set correct perspective for IE10
        if (swiper.support.pointerEvents || swiper.support.prefixedPointerEvents) {
          const ws = $wrapperEl[0].style;
          ws.perspectiveOrigin = `${center}px 50%`;
        }
      },
      setTransition(duration) {
        const swiper = this;
        swiper.slides
        .transition(duration)
        .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
        .transition(duration);
      }
    }
  }
  
  
 
  constructor(private postprovidder: PostProvider,private modalctrl: ModalController, 
    private popoverctrl: PopoverController, private navctrl: NavController, private storage: Storage, private alertCtrl: AlertController ) { }
    
    ionViewDidEnter(){
      this.topup= [];
      this.storage.get('msrno').then((val) => {
        this.msrno = val;
        this.dashboard();
        this.loadReport();
      });
      
    }
   
  ionSlidesDidLoad(){
    return new Promise(resolve => {
      this.slides.nativeElement.addEventListener('ionSlidesDidLoad', () => {
        resolve(true);
      });
    });
  }

  gotoNext(slideindex){
    this.slides.slideTo(slideindex);
  }

    ngOnInit() {
      this.storage.get('msrno').then((val) => {
        this.msrno = val;
        this.dashboard();
      });
    }
    
    hidelists(){
      if (  this.hidelist == true) {
        this.hidelist = false;
      } else {
        this.hidelist = true;
      }
    }
    
    loadReport() {
      return new Promise(resolve => {
        let body = {
          aksi : 'topup',
          limit : 8,
          start : 0,
          id : this.msrno,
          counts: 0,
          sort: 'ondate',
          by: 'desc'
        };
        let i =0;
        this.postprovidder.postData(body, 'proses-api.php').subscribe(data => {
          for (let report of data.result) {
            i++;
            this.topup.push(report);
            
            this.hide2 = false;
          }if(i===0){
            this.hide2 = false;
          }
          resolve(true);
        });
      });
    }
    
    async dashboard(){ // dashboard get data method
      return new Promise(resolve => {
        let body = {
          aksi: 'dashboard',
          msrno: this.msrno
        };
        this.postprovidder.postData(body, 'process.php').subscribe(async data => {
          this.sample = data['results']['first'];
          this.gross = data['results']['gross'];
          this.swallet = data['results']['swallet'];
          this.oro =  data['results']['oro'];
          this.username = data['account']['username'];
          this.accountname = data['account']['accountname'];
          this.accountno = data['account']['accountno'];
          this.bitcoin = data['account']['bitcoinadd'];
          this.bankname =  data['account']['bankname'];
          // this.storage.set('username', this.username);
          this.hide = false;
          // this.getnews();
          // this.refname = this.username;
        });
      });
    }
    
    trys(){
      console.log('trys');
    }
    
    
    //:::modals function start
    async presentModal(typ,ev: any) {
      console.log(typ);
      const modal = await this.modalctrl.create({
        component: QrmodalPage,
        componentProps: {
          'tp': typ,
       
        }
      });

      return await modal.present();
    }
    
    async openNewsDetails() {
      const modal = await this.modalctrl.create({
        component: NewsdetailPage,
        componentProps: {
          'firstName': 'Douglas',
          'lastName': 'Adams',
          'middleInitial': 'N'
        }
      });

      modal.onDidDismiss().then((data) => {
        this.ngOnInit();
      });

      return await modal.present();
    }
    
    async openConvertOro() {
      const modal = await this.modalctrl.create({
        component: ConvertoroPage,
        componentProps: {
          'firstName': 'Douglas',
          'lastName': 'Adams',
          'middleInitial': 'N'
        }
      });

      modal.onDidDismiss().then((data) => {
        this.ngOnInit();
      });

      return await modal.present();
    }
    
    async openBuyOro() {
      const modal = await this.modalctrl.create({
        component: BuyoroPage,
        componentProps: {
          'firstName': 'Douglas',
          'lastName': 'Adams',
          'middleInitial': 'N'
        }
      });

      modal.onDidDismiss().then((data) => {
        this.ngOnInit();
      });


      return await modal.present();
    }
    
    async openSend() {
      const modal = await this.modalctrl.create({
        component: TopupfundPage,
        componentProps: {
          'firstName': 'Douglas',
          'lastName': 'Adams',
          'middleInitial': 'N'
        }
      });

      modal.onDidDismiss().then((data) => {
        this.ngOnInit();
      });

      return await modal.present();
    }
    
    async openTransfer() {
      const modal = await this.modalctrl.create({
        component: TransferfundPage,
        componentProps: {
          'firstName': 'Douglas',
          'lastName': 'Adams',
          'middleInitial': 'N'
        }
      });

      modal.onDidDismiss().then((data) => {
        this.ngOnInit();
      });

      return await modal.present();
    }
    
    async openConvert() {
      const modal = await this.modalctrl.create({
        component: ConvertPage,
        componentProps: {
          'firstName': 'Douglas',
          'lastName': 'Adams',
          'middleInitial': 'N'
        }
      });

      modal.onDidDismiss().then((data) => {
        this.ngOnInit();
      });

      return await modal.present();
    }
    
    async openWithdraw() {
      const modal = await this.modalctrl.create({
        component: WithdrawPage,
        componentProps: {
          'firstName': 'Douglas',
          'lastName': 'Adams',
          'middleInitial': 'N'
        }
      });

      modal.onDidDismiss().then((data) => {
        this.ngOnInit();
      });

      return await modal.present();
    }
    
    async openEscrow() {
      const modal = await this.modalctrl.create({
        component: EscrowPage,
        componentProps: {
          'firstName': 'Douglas',
          'lastName': 'Adams',
          'middleInitial': 'N'
        }
      });

      modal.onDidDismiss().then((data) => {
        this.ngOnInit();
      });

      return await modal.present();
    }

    async openSendOro() {
      const modal = await this.modalctrl.create({
        component: SendmenuPage,
        componentProps: {
          'firstName': 'Douglas',
          'lastName': 'Adams',
          'middleInitial': 'N'
        }
      });

      modal.onDidDismiss().then((data) => {
        this.ngOnInit();
      });

      return await modal.present();
    }
    
    //::end
    
    //:::colapse
    
    //::end

    gotoYT(){
      window.location.href = "https://www.youtube.com/channel/UC57EmcC6yrNIH9RqxzRmMHQ?sub_confirmation=1";
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
  