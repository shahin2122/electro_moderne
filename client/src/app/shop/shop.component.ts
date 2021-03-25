import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../admin/admin.service';
import { IPagination } from '../shared/models/pagination';
import { product } from '../shared/models/product';
import { IProductBrand } from '../shared/models/productBrand';
import { IProductType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search', {static: false}) searchTerm: ElementRef
  brands: IProductBrand[];
  types: IProductType[];
  products: product[];
  shopParams = new ShopParams();
  totalCount: number;
  sortOptions = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price: Low to High', value: 'priceAsc'},
    {name: 'Price High to Low', value: 'priceDesc'}
  ];


  constructor( private shopService: ShopService) { }

  ngOnInit(): void {
    this.getBrands();
    this.getTypes();
    this.getProducts();
  }

  getBrands() {
    this.shopService.getBrands().subscribe(brands => {
      this.brands = [{id: 0, name: 'All'}, ...brands];
    })
  }

  getTypes() {
    this.shopService.getTypes().subscribe(types => {
      this.types = [{id: 0, name: 'All'}, ...types];
    })
  }

  getProducts() {
    this.shopService.getProducts(this.shopParams)
    .subscribe(response => {
      this.products = response.data;
      this.shopParams.pageNumber = response.pageIndex;
      this.shopParams.pageSize = response.pageSize;
      this.totalCount = response.count;
    })
  }

  onBrandSelected(brandId: number) {
    this.shopParams.brandId = brandId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onTypeSelected(typeId: number) {
    this.shopParams.typeId = typeId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onSortSelected(sort: string) {
    this.shopParams.sort = sort;
    this.getProducts();
  }

  onPageChanged(event:any) {
    if(this.shopParams.pageNumber !== event){
    this.shopParams.pageNumber = event;
    this.getProducts();
    }
  }

  onSearch() {
    this.shopParams.search = this.searchTerm.nativeElement.value;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onReset() {
    this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.getProducts();
  }
}
