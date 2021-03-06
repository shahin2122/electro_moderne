import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { product } from 'src/app/shared/models/product';
import { IProductBrand } from 'src/app/shared/models/productBrand';
import { IProductType } from 'src/app/shared/models/productType';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.scss']
})
export class AddNewProductComponent implements OnInit {
  addProductForm: FormGroup;
  brands: IProductBrand[];
  types: IProductType[];
  product: product;

  constructor(private adminService: AdminService, private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.initializeForm();
    this.getBrands();
    this.getTypes();
  }

  initializeForm(){
    this.addProductForm = new FormGroup({
      Name: new FormControl('', [Validators.required]),
      Description: new FormControl('', [Validators.required]),
      Price: new FormControl('', [Validators.required]),
      ProductTypeId: new FormControl('', [Validators.required]),
      ProductBrandId: new FormControl('', [Validators.required]),
      Specs: new FormControl('', [Validators.required]),
      Used: new FormControl('', ),
      LocalId: new FormControl('', [Validators.required]),
      TypeId: new FormControl(''),
      BrandId: new FormControl(''),
    });
  }

  onSubmit() {

    this.adminService.addNewProduct(this.addProductForm.value).subscribe((response: product) => {
      this.toastr.success("New Product  Added");
      this.adminService.productToAddPhoto = response;
      this.router.navigateByUrl("/admin/photo-editor/" + response.id);
    }, error => {
      console.log(error);
      this.toastr.error(error);
    })
  }

  getBrands() {
    this.adminService.getBrands().subscribe(brands => {
      this.brands = brands;
    })
  }

  getTypes() {
    this.adminService.getTypes().subscribe(types => {
      this.types = types;
    })
  }
}
