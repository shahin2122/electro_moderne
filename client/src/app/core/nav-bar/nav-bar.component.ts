import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { AdminService } from 'src/app/admin/admin.service';
import { IUSer } from 'src/app/shared/models/user';
import { IProductBrand } from 'src/app/shared/models/productBrand';
import { IProductType } from 'src/app/shared/models/productType';
import { ShopService } from 'src/app/shop/shop.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  currentUser$: Observable<IUSer>;
  brands: IProductBrand[];
  types: IProductType[];

  constructor(private accountService: AccountService, private shopService: ShopService) { }

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;
    this.getBrands();
    this.getTypes();
  }

  logOut() {
    this.accountService.logOut();
  }

  getBrands() {
    this.shopService.getBrands().subscribe(brands => {
      this.brands = brands;
    })
  }

  getTypes() {
    this.shopService.getTypes().subscribe(types => {
      this.types = types;
    })
  }
}
