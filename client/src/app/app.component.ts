import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
import { filter } from 'rxjs/operators';
import { AccountService } from './account/account.service';
import { BasketService } from './basket/basket.service';
import { RepairRequestService } from './repair-request/repair-request.service';


declare var gtag;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Home Appliance Repair & Installation in Montreal Quebec-Electro Moderne';

  constructor(private accountService: AccountService, private basketService: BasketService,
    private repairRequestService: RepairRequestService, router: Router, private gtmService: GoogleTagManagerService) {
     const navEndEvents = router.events.pipe(
        filter(event => event instanceof NavigationEnd),
      );
      navEndEvents.subscribe((event: NavigationEnd) => {
        gtag('config', 'G-XBD7V2YQ03', {
          'page_path': event.urlAfterRedirects
        });
        const gtmTag = {
          event: 'page',
          pageName: event.url
        };
        this.gtmService.pushTag(gtmTag);
      });
    }

  ngOnInit(){
    this.loadCurrentUser();
    this.loadUnseenRequests();
    const basketId = localStorage.getItem('basket_id');
    if(basketId) {
      this.basketService.getBasket(basketId).subscribe(() => {
        console.log('initialised basket');
      }, error => {
        console.log(error);
      });
    }
  }

  loadCurrentUser() {
    const token = localStorage.getItem('token');
   
      this.accountService.loadCurrentUser(token).subscribe(() => {
       
      }, error => {
        console.log(error);
      });
    }

  loadUnseenRequests() {
    this.repairRequestService.getUnseenRequestsCount();
    console.log("app component " + this.repairRequestService.getUnseenRequestsCount().subscribe());
  }


  }

