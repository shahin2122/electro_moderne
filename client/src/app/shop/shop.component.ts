import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin/admin.service';
import { IPagination } from '../shared/models/pagination';
import { product } from '../shared/models/product';
import { IProductBrand } from '../shared/models/productBrand';
import { IProductType } from '../shared/models/productType';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  brands: Partial<IProductBrand[]>;
  types: Partial<IProductType[]>;
  products: product[];


  constructor(private adminService: AdminService, private shopService: ShopService) { }

  ngOnInit(): void {
    this.getBrands();
    this.getTypes();
    this.getProducts();
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

  getProducts() {
    this.shopService.getProducts().subscribe(response => {
      this.products = response.data;
      console.log("response"+response.data);
    })
  }

}
