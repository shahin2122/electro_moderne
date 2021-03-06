import { Component, OnInit } from '@angular/core';
import { IPartBrand } from 'src/app/shared/models/partBrand';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-part-brands',
  templateUrl: './part-brands.component.html',
  styleUrls: ['./part-brands.component.scss']
})
export class PartBrandsComponent implements OnInit {
  brands: IPartBrand[];
  pageNumber = 1;
  pageSize = 10;
  totalCount: number;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands() {
    this.adminService.getPartBrandsPaginated(this.pageNumber, this.pageSize).subscribe(response => {
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
