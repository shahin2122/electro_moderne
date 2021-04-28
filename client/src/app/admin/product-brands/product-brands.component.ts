import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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
  
  constructor(private adminService: AdminService, private toastr: ToastrService) { }

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

  deleteBrand(id: number){
    this.adminService.deleteProductBrand(id).subscribe(()=> {
      this.toastr.success("Product Brand Deleted");
      this.getBrands();
    }, error => {
      this.toastr.error(error);
      console.log(error);
    })
  }
}
