import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'newsdetail', loadChildren: './newsdetail/newsdetail.module#NewsdetailPageModule' },
  { path: 'qrmodal', loadChildren: './qrmodal/qrmodal.module#QrmodalPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'convertoro', loadChildren: './convertoro/convertoro.module#ConvertoroPageModule' },
  { path: 'buyoro', loadChildren: './buyoro/buyoro.module#BuyoroPageModule' },
  { path: 'signup', loadChildren: './signup/signup.module#SignupPageModule' },
  { path: 'topupfund', loadChildren: './topupfund/topupfund.module#TopupfundPageModule' },
  { path: 'transferfund', loadChildren: './transferfund/transferfund.module#TransferfundPageModule' },
  { path: 'withdraw', loadChildren: './withdraw/withdraw.module#WithdrawPageModule' },
  { path: 'convert', loadChildren: './convert/convert.module#ConvertPageModule' },
  { path: 'escrow', loadChildren: './escrow/escrow.module#EscrowPageModule' },
  { path: 'lockscreen', loadChildren: './lockscreen/lockscreen.module#LockscreenPageModule' },
  { path: 'trading', loadChildren: './trading/trading.module#TradingPageModule' },
  { path: 'referral', loadChildren: './referral/referral.module#ReferralPageModule' },
  { path: 'investment-summary', loadChildren: './investment-summary/investment-summary.module#InvestmentSummaryPageModule' },
  { path: 'noreport', loadChildren: './noreport/noreport.module#NoreportPageModule' },
  { path: 'incomesummary', loadChildren: './incomesummary/incomesummary.module#IncomesummaryPageModule' },
  { path: 'withdrawal', loadChildren: './withdrawal/withdrawal.module#WithdrawalPageModule' },
  { path: 'convert-history', loadChildren: './convert-history/convert-history.module#ConvertHistoryPageModule' },
  { path: 'download-report/:report', loadChildren: './download-report/download-report.module#DownloadReportPageModule' },
  { path: 'account', loadChildren: './account/account.module#AccountPageModule' },
  { path: 'security', loadChildren: './security/security.module#SecurityPageModule' },
  { path: 'wallet', loadChildren: './wallet/wallet.module#WalletPageModule' },
  { path: 'changepin', loadChildren: './changepin/changepin.module#ChangepinPageModule' },
  { path: 'transac-pass', loadChildren: './transac-pass/transac-pass.module#TransacPassPageModule' },
  { path: 'transac-pass1', loadChildren: './transac-pass1/transac-pass1.module#TransacPass1PageModule' },
  { path: 'modalbuy', loadChildren: './modalbuy/modalbuy.module#ModalbuyPageModule' },
  { path: 'sold-oro', loadChildren: './sold-oro/sold-oro.module#SoldOroPageModule' },
  { path: 'notifications', loadChildren: './notifications/notifications.module#NotificationsPageModule' },
  { path: 'request', loadChildren: './request/request.module#RequestPageModule' },
  { path: 'sendoro', loadChildren: './sendoro/sendoro.module#SendoroPageModule' },
  { path: 'boughoro', loadChildren: './boughoro/boughoro.module#BoughoroPageModule' },
  { path: 'sendmenu', loadChildren: './sendmenu/sendmenu.module#SendmenuPageModule' },
  { path: 'qrscanner', loadChildren: './qrscanner/qrscanner.module#QrscannerPageModule' },
  { path: 'bank-withdraw', loadChildren: './bank-withdraw/bank-withdraw.module#BankWithdrawPageModule' },
  { path: 'banks/:type', loadChildren: './banks/banks.module#BanksPageModule' },
  { path: 'cashout/:bank/:type', loadChildren: './cashout/cashout.module#CashoutPageModule' },
  { path: 'cashoutinfo/:bank/:amount/:type', loadChildren: './cashoutinfo/cashoutinfo.module#CashoutinfoPageModule' },
  { path: 'send-report', loadChildren: './send-report/send-report.module#SendReportPageModule' },
 
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
