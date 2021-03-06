import { Component, OnInit } from '@angular/core';
import { IProductBrand } from 'src/app/shared/models/productBrand';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-product-brands',
  templateUrl: './product-brands.component.html',
  styleUrls: ['./product-brands.component.scss']
})
export class ProductBrandsComponent implements OnInit {
  brands: IProductBrand[];
  pageNumber = 1;
  pageSize = 10;
  totalCount: number;
  
  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands() {
    this.adminService.getBrandsPaginated(this.pageNumber, this.pageSize).subscribe(response => {
      this.brands = response.data;
      this.pageNumber = response.pageIndex;
      this.pageSize = response.pageSize;
      this.totalCount = response.count;
    })
  }

  onPageChanged(event: any) {
    if(this.pageNumber !== event){
      this.pageNumber = event;
      this.getBrands();
    }
  }
}
