import { Component, OnInit } from '@angular/core';
import { IProductBrand } from 'src/app/shared/models/productBrand';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-product-brands',
  templateUrl: './product-brands.component.html',
  styleUrls: ['./product-brands.component.scss']
})
export class ProductBrandsComponent implements OnInit {
  brands: Partial<IProductBrand[]>;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands() {
    this.adminService.getBrands().subscribe(brands => {
      this.brands = brands;
    })
  }

}
