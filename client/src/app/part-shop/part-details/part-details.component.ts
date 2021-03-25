import { Component, OnInit } from '@angular/core';
import { IPart } from 'src/app/shared/models/part';
import { PartShopService } from '../part-shop.service';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { map } from 'rxjs/operators';
import { IPartPhoto } from 'src/app/shared/models/PartPhoto';
import { BasketService } from 'src/app/basket/basket.service';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-part-details',
  templateUrl: './part-details.component.html',
  styleUrls: ['./part-details.component.scss']
})
export class PartDetailsComponent implements OnInit {
part: IPart;
partPhotos: IPartPhoto[] = [];
galleryOptions: NgxGalleryOptions[];
GalleryImages: NgxGalleryImage[];
quantity = 1;

  constructor(private partShopService: PartShopService, private activatedRoute: ActivatedRoute,
    private basketService: BasketService, private bcService: BreadcrumbService) { }

  ngOnInit(): void {
    this.loadPart();

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

  loadPart() {
    this.partShopService.getPart(+this.activatedRoute.snapshot.paramMap.get('id')).subscribe(part => {
        this.part = part;
        this.bcService.set('@partDetails', part.name);
        this.GalleryImages = this.getImages();

      })
      
  }


  getImages(): NgxGalleryImage[] {
    
    const imageUrls = [];

    this.partShopService.getPhotosOfPart(this.part.id).subscribe((response) => {
      for(let photo of response){
        imageUrls.push({
          small: photo?.url,
          medium: photo?.url,
          big: photo?.url
      })}
  })
  return imageUrls;
  }

  addItemToBasket() {
    this.basketService.addPartItemToBasket(this.part, this.quantity);
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
