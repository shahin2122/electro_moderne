import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { product } from 'src/app/shared/models/product';
import { ShopService } from '../shop.service';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { Photo } from 'src/app/shared/models/photo';
import { map } from 'rxjs/operators';
import { BasketService } from 'src/app/basket/basket.service';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
product: product;
productPhotos: Photo[] = [];
galleryOptions: NgxGalleryOptions[];
GalleryImages: NgxGalleryImage[];
quantity = 1;

  constructor(private shopService: ShopService, private activatedRoute: ActivatedRoute,
    private basketService: BasketService, private bcService: BreadcrumbService) {
      this.bcService.set('@productDetails','')
     }

  ngOnInit(): void {
    this.loadProduct();

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ]

   
  }

  loadProduct() {
    this.shopService.getProduct(+this.activatedRoute.snapshot.paramMap.get('id')).subscribe(product => {
        this.product = product;
        this.bcService.set('@productDetails', product.name);
        this.GalleryImages = this.getImages();
      })
      
  }

  addItemToBasket() {
    this.basketService.addProductItemToBasket(this.product, this.quantity);
  }

  getImages(): NgxGalleryImage[] {
    
    const imageUrls = [];

    this.shopService.getPhotosOfProduct(this.product.id).subscribe((response) => {
      for(let photo of response){
        imageUrls.push({
          small: photo?.url,
          medium: photo?.url,
          big: photo?.url
      })}
  })
  return imageUrls;
  }

  incrementQuantity() {
    
      this.quantity++;
    
    
  }

  decrementQuantity() {
    if(this.quantity > 1) {
    this.quantity--;
    }
  }

}
