import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { AdminService } from 'src/app/admin/admin.service';
import { IUSer } from 'src/app/shared/models/user';
import { IProductBrand } from 'src/app/shared/models/productBrand';
import { IProductType } from 'src/app/shared/models/productType';
import { ShopService } from 'src/app/shop/shop.service';
import { IBasket } from 'src/app/shared/models/basket';
import { BasketService } from 'src/app/basket/basket.service';
import { IPartType } from 'src/app/shared/models/partType';
import { PartShopService } from 'src/app/part-shop/part-shop.service';
import { RepairRequestService } from 'src/app/repair-request/repair-request.service';
import { ContactUsService } from 'src/app/contact-us/contact-us.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  currentUser$: Observable<IUSer>;
  partTypes: IPartType[];
  types: IProductType[];
  basket$: Observable<IBasket>;
  unseenRepairReqs = 0;
  unseenContactReqs = 0;


  constructor(private accountService: AccountService, private shopService: ShopService, private partShopService: PartShopService,
    private basketService: BasketService,private repairRequestService: RepairRequestService, private contactUsService: ContactUsService) { }

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;
    this.basket$ = this.basketService.basket$;
    this.getUnseenRepairRequests();
    this.getUnseenContactRequests();
    this.getPartTypes();
    this.getTypes();
  }

  logOut() {
    this.accountService.logOut();
  }

  getPartTypes() {
   this.partShopService.getTypes().subscribe(types => {
     this.partTypes = types;
   });
  }

  getTypes() {
    this.shopService.getTypes().subscribe(types => {
      this.types = types;
    });
  }

  getUnseenRepairRequests() {
    this.repairRequestService.getUnseenRequestsCount().subscribe(reqs  => {
      this.unseenRepairReqs = reqs;
    });
  }

  getUnseenContactRequests(){
    this.contactUsService.getUnseenRequestsCount().subscribe(reqs => {
      this.unseenContactReqs = reqs;
    });
  }
  
}
