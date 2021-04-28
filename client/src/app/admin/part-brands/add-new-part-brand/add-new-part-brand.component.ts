import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IPartBrand } from 'src/app/shared/models/partBrand';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-add-new-part-brand',
  templateUrl: './add-new-part-brand.component.html',
  styleUrls: ['./add-new-part-brand.component.scss']
})
export class AddNewPartBrandComponent implements OnInit {
  addBrandForm: FormGroup;
  isUpdate = false;
  brand : IPartBrand;


  constructor(private adminService: AdminService, private toastr: ToastrService, 
    private router:Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.initializeForm();

    if(this.activatedRoute.snapshot.paramMap.get('id'))
    {
      this.isUpdate = true;
      this.adminService.getPartBrand(Number(this.activatedRoute.snapshot.paramMap.get('id')))
        .subscribe(response => {
          this.brand = response;
          this.addBrandForm.get('brandName').patchValue(this.brand.name);
        })
    }
  }

  initializeForm(){
    this.addBrandForm = new FormGroup({
      brandName: new FormControl('', [Validators.required])
    });
  }

  onSubmit(){
    if(this.isUpdate)
    {
      this.adminService.updatePartBrand(this.brand.id, this.addBrandForm.controls.brandName.value)
      .subscribe(() => {
        this.toastr.success("Part Brand Edited Successfully");
        this.router.navigateByUrl("/admin/pannel");
      }, error => {
        console.log(error);
        this.toastr.error(error);
      })
    }else
    {
      this.adminService.addNewPartBrand(this.addBrandForm.controls.brandName.value).subscribe(() => {
        this.toastr.success("New Part Brand Added");
        this.router.navigateByUrl("/admin/pannel");
      }, error => {
        console.log(error);
        this.toastr.error(error.error);
      });
    }
  }

}
