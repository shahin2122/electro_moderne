import { Component, OnInit } from '@angular/core';
import { IProductType } from 'src/app/shared/models/productType';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-product-types',
  templateUrl: './product-types.component.html',
  styleUrls: ['./product-types.component.scss']
})
export class ProductTypesComponent implements OnInit {
 types: Partial<IProductType[]>;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.getTypes();
  }

  getTypes() {
    this.adminService.getTypes().subscribe(types => {
      this.types = types;
    })
  }

}
