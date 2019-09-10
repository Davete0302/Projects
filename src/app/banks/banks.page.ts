import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-banks',
  templateUrl: './banks.page.html',
  styleUrls: ['./banks.page.scss'],
})
export class BanksPage implements OnInit {
banks: any=[ 'Allied Bank','Banco De Oro','Bank of the Philippine Islands','China Bank','LandBank','Metrobank','One Network Bank','Philippine National Bank'
            ,'Unionbank','United Coconut Platers Bank'];
  constructor(private router:Router) { }

  ngOnInit() {
  }
  reroute(outlet){
    const route = 'cashout/' +outlet+'/bank' ;
    this.router.navigateByUrl(route);
  }
}
