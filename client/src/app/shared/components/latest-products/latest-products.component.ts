import { Component, OnInit } from '@angular/core';
import { ShopService } from 'src/app/shop/shop.service';
import { product } from '../../models/product';

@Component({
  selector: 'app-latest-products',
  templateUrl: './latest-products.component.html',
  styleUrls: ['./latest-products.component.scss']
})
export class LatestProductsComponent implements OnInit {

  products: product[];

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.shopService.getLatestProduct().subscribe(response => {
      this.products = response.data.slice(0, 5);
    
    })
  }

}
