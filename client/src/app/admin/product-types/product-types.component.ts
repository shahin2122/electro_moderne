import { Component, OnInit } from '@angular/core';
import { IProductType } from 'src/app/shared/models/productType';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-product-types',
  templateUrl: './product-types.component.html',
  styleUrls: ['./product-types.component.scss']
})
export class ProductTypesComponent implements OnInit {
 types: IProductType[];
 pageNumber = 1;
 pageSize = 10;
 totalCount: number;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.getTypes();
  }

  getTypes() {
    this.adminService.getTypesPaginated(this.pageNumber, this.pageSize).subscribe(response => {
      this.types = response.data;
      this.pageNumber = response.pageIndex;
      this.pageSize = response.pageSize;
      this.totalCount = response.count;
      
    })
  }

  onPageChanged(event: any) {
    if(this.pageNumber !== event){
      this.pageNumber = event;
      this.getTypes();
    }
  }

}
