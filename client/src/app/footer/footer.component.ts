import { Component, OnInit } from '@angular/core';
import { PartShopService } from '../part-shop/part-shop.service';
import { IPartType } from '../shared/models/partType';
import { IProductType } from '../shared/models/productType';
import { ShopService } from '../shop/shop.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
 currentDate = new Date;
 partTypes: IPartType[];
 types: IProductType[];


  constructor( private shopService: ShopService, private partShopService: PartShopService) { }

  ngOnInit(): void {
    this.getPartTypes();
    this.getTypes();
  }


  getPartTypes() {
    this.partShopService.getTypes().subscribe(types => {
      this.partTypes = types;
    })
   }
 
   getTypes() {
     this.shopService.getTypes().subscribe(types => {
       this.types = types;
     })
   }
}
