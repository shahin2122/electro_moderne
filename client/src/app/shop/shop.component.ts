import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin/admin.service';
import { IProductBrand } from '../shared/models/productBrand';
import { IProductType } from '../shared/models/productType';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  brands: Partial<IProductBrand[]>;
  types: Partial<IProductType[]>;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.getBrands();
    this.getTypes();
  }

  getBrands() {
    this.adminService.getBrands().subscribe(brands => {
      this.brands = brands;
    })
  }

  getTypes() {
    this.adminService.getTypes().subscribe(types => {
      this.types = types;
    })
  }

}
