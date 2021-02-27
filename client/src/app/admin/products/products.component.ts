import { Component, OnInit } from '@angular/core';
import { product } from 'src/app/shared/models/product';
import { AdminService } from '../admin.service';
import { IPagination } from '../../shared/models/pagination';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
 products: product[] ;
  constructor(private adminService: AdminService, private router: Router) { }

  ngOnInit() {
    this.adminService.getProducts().subscribe(response  => {
      this.products = response.data;
      console.log("response is:" + response.data);
    }, error => {
      console.log(error);
    })
  }

  setProductToAddPhoto(product: product){
    this.adminService.productToAddPhoto = product;
    this.router.navigateByUrl("/admin/photo-editor/"+ product.id);
  }


}
