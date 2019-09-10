import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-bank-withdraw',
  templateUrl: './bank-withdraw.page.html',
  styleUrls: ['./bank-withdraw.page.scss'],
})
export class BankWithdrawPage implements OnInit {

  constructor(private router: Router) { }
  ngOnInit() {
  }
  reroute(outlet){
    if(outlet=='Gcash'){
      const route = 'cashout/' +outlet+'/gcash';
      this.router.navigateByUrl(route);
    }else{
      const route = 'cashout/' +outlet+'/other';
      this.router.navigateByUrl(route);
    }
    
  }
}
