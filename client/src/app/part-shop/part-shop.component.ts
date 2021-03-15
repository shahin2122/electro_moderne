import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IPart } from '../shared/models/part';
import { IPartBrand } from '../shared/models/partBrand';
import { IPartType } from '../shared/models/partType';
import { ShopParams } from '../shared/models/shopParams';
import { PartShopService } from './part-shop.service';

@Component({
  selector: 'app-part-shop',
  templateUrl: './part-shop.component.html',
  styleUrls: ['./part-shop.component.scss']
})
export class PartShopComponent implements OnInit {
  @ViewChild('search', {static: true}) searchTerm: ElementRef
  brands: IPartBrand[];
  types: IPartType[];
  parts: IPart[];
  shopParams = new ShopParams();
  totalCount: number;
  sortOptions = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price: Low to High', value: 'priceAsc'},
    {name: 'Price High to Low', value: 'priceDesc'}
  ];

  constructor(private partShopService: PartShopService) { }

  ngOnInit(): void {
    this.getTypes();
    this.getBrands();
    this.getParts();
  }


  getTypes() {
    this.partShopService.getTypes().subscribe(types => {
      this.types = [{id: 0, name: 'All'}, ...types];
      console.log("types = "+this.types);
    })
  }

  getBrands() {
    this.partShopService.getBrands().subscribe(brands => {
      this.brands = [{id: 0, name: 'All'}, ...brands];
    })
  }

  getParts() {
    this.partShopService.getParts(this.shopParams)
      .subscribe(response => {
        this.parts = response.data;
        this.shopParams.pageNumber = response.pageIndex;
        this.shopParams.pageSize = response.pageSize;
        this.totalCount = response.count;
      })
  }

  onBrandSelected(brandId: number) {
    this.shopParams.brandId = brandId;
    this.shopParams.pageNumber = 1;
    this.getParts();
  }

  onTypeSelected(typeId: number) {
    this.shopParams.typeId = typeId;
    this.shopParams.pageNumber = 1;
    this.getParts();
  }

  onSortSelected(sort: string) {
    this.shopParams.sort = sort;
    this.getParts();
  }

  onPageChanged(event:any) {
    if(this.shopParams.pageNumber !== event){
    this.shopParams.pageNumber = event;
    this.getParts();
    }
  }

  onSearch() {
    this.shopParams.search = this.searchTerm.nativeElement.value;
    this.shopParams.pageNumber = 1;
    this.getParts();
  }

  onReset() {
    this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.getParts();
  }
}
