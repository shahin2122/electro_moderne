import { Component, OnInit } from '@angular/core';
import { product } from 'src/app/shared/models/product';
import { AdminService } from '../admin.service';
import { IPagination } from '../../shared/models/pagination';
import { Router } from '@angular/router';
import { ShopParams } from 'src/app/shared/models/shopParams';
import { ShopService } from 'src/app/shop/shop.service';
import { AdminProductsParams } from 'src/app/shared/models/adminProductsParams';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
 products: product[] ;
 totalCount: number;
 productsParams = new AdminProductsParams();

  constructor(private adminService: AdminService, private router: Router) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.adminService.getProducts(this.productsParams)
    .subscribe(response => {
      this.products = response.data;
      this.productsParams.pageNumber = response.pageIndex;
      this.productsParams.pageSize = response.pageSize;
      this.totalCount = response.count;
    })
  }

  setProductToAddPhoto(product: product){
    this.adminService.productToAddPhoto = product;
    this.router.navigateByUrl("/admin/photo-editor/"+ product.id);
  }

  onPageChanged(event:any) {
    if(this.productsParams.pageNumber !== event){
    this.productsParams.pageNumber = event;
    this.getProducts();
    }
  }

}
