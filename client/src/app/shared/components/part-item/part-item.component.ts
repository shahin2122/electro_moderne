import { Component, Input, OnInit } from '@angular/core';
import { BasketService } from 'src/app/basket/basket.service';
import { IPart } from 'src/app/shared/models/part';

@Component({
  selector: 'app-part-item',
  templateUrl: './part-item.component.html',
  styleUrls: ['./part-item.component.scss']
})
export class PartItemComponent implements OnInit {
@Input() part: IPart;

  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
  }

  addItemToBasket() {
    this.basketService.addPartItemToBasket(this.part);
  }

}
