import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { HttpModule } from '@angular/http';
import { QrmodalPage } from './qrmodal/qrmodal.page';
import { NewsdetailPage } from './newsdetail/newsdetail.page';
import { PostProvider } from '../../providers/postprovider';
import { IonicStorageModule } from '@ionic/storage';
import { ConvertoroPage } from './convertoro/convertoro.page';
import { FormsModule } from '@angular/forms';
import { BuyoroPage } from './buyoro/buyoro.page';
import { TransferfundPage } from './transferfund/transferfund.page';
import { TopupfundPage } from './topupfund/topupfund.page';
import { WithdrawPage } from './withdraw/withdraw.page';
import { ConvertPage } from './convert/convert.page';
import { EscrowPage } from './escrow/escrow.page';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { AccountPage } from './account/account.page';
import { SecurityPage } from './security/security.page';
import { ModalbuyPage } from './modalbuy/modalbuy.page';
import { NotificationsPage } from './notifications/notifications.page';
import { RequestPage } from './request/request.page';
import { SendoroPage } from './sendoro/sendoro.page';
import { SendmenuPage } from './sendmenu/sendmenu.page';
import { Keyboard } from '@ionic-native/keyboard/ngx';

//import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@NgModule({
  declarations: [AppComponent, QrmodalPage, NewsdetailPage, ConvertoroPage, ModalbuyPage, NotificationsPage, RequestPage,SendoroPage,
    BuyoroPage, TransferfundPage, TopupfundPage, WithdrawPage, ConvertPage, EscrowPage, AccountPage, SecurityPage],
  entryComponents: [QrmodalPage, NewsdetailPage, ConvertoroPage, ModalbuyPage, NotificationsPage, RequestPage,SendoroPage,
    BuyoroPage, TransferfundPage, TopupfundPage, WithdrawPage, ConvertPage, EscrowPage, AccountPage, SecurityPage],
  imports: [FormsModule, BrowserModule, 
    IonicModule.forRoot(), IonicStorageModule.forRoot(), 
    AppRoutingModule,  HttpModule, NgxQRCodeModule],
  providers: [
    StatusBar,
    SplashScreen,
    PostProvider, File, BarcodeScanner,
    FileOpener,
    Keyboard,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
