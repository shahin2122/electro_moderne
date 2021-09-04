import { Component, OnInit } from '@angular/core';
import { PartShopService } from 'src/app/part-shop/part-shop.service';
import { IPart } from '../../models/part';

@Component({
  selector: 'app-latest-parts',
  templateUrl: './latest-parts.component.html',
  styleUrls: ['./latest-parts.component.scss']
})
export class LatestPartsComponent implements OnInit {

  parts: IPart[];

  constructor(private partShopService: PartShopService) { }

  ngOnInit(): void {
    this.getParts();
  }

  getParts(){
    this.partShopService.getLatestParts().subscribe(response => {
      this.parts = response.data.slice(0, 5);
    })
  }

}
