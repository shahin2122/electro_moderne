import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IProductBrand } from 'src/app/shared/models/productBrand';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-add-new-brand',
  templateUrl: './add-new-brand.component.html',
  styleUrls: ['./add-new-brand.component.scss']
})
export class AddNewBrandComponent implements OnInit {
 addBrandForm: FormGroup;
 isUpdate = false;
 brand : IProductBrand;

  constructor(private adminService: AdminService, private toastr: ToastrService,
    private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.initializeForm();

    if(this.activatedRoute.snapshot.paramMap.get('id'))
    {
      this.isUpdate = true;
      this.adminService.getBrand(Number(this.activatedRoute.snapshot.paramMap.get('id')))
        .subscribe(response => {
          this.brand = response;
          this.addBrandForm.get('brandName').patchValue(this.brand.name);
        })
    }
  }

  initializeForm() {
    this.addBrandForm = new FormGroup({
      brandName: new FormControl('', [Validators.required])
    });
  }

  onSubmit() {
    if(this.isUpdate)
    {
      this.adminService.updateProductBrand(this.brand.id, this.addBrandForm.controls.brandName.value)
        .subscribe(() => {
          this.toastr.success("Product Brand Edited Successfully");
          this.router.navigateByUrl("/admin/pannel");
        }, error => {
          console.log(error);
          this.toastr.error(error);
        })
    }else{
      this.adminService.addNewBrand(this.addBrandForm.controls.brandName.value).subscribe(() => {
        this.toastr.success("New Product Brand Added");
        this.router.navigateByUrl("/admin/pannel");
      }, error => {
        console.log(error);
        this.toastr.error(error);
      });
    }
  }
}
