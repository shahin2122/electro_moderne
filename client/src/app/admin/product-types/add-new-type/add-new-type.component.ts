import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IProductType } from 'src/app/shared/models/productType';
import { BreadcrumbService } from 'xng-breadcrumb';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-add-new-type',
  templateUrl: './add-new-type.component.html',
  styleUrls: ['./add-new-type.component.scss']
})
export class AddNewTypeComponent implements OnInit {
  addTypeForm: FormGroup;
  isUpdate = false;
  type: IProductType;

  constructor(private adminService: AdminService, private toastr: ToastrService, 
    private router:Router, private activatedRoute: ActivatedRoute, private bcService: BreadcrumbService) {
      this.bcService.set('@addType', '');
     }

  ngOnInit(): void {

    this.initializeForm();

    if(this.activatedRoute.snapshot.paramMap.get('id') )
    {
      this.isUpdate = true;
      this.adminService.getType(Number(this.activatedRoute.snapshot.paramMap.get('id')))
      .subscribe(response => {
        this.type = response;
        this.addTypeForm.get('typeName').patchValue(this.type.name);
      })
      this.bcService.set('@addType','Editing:'+ this.type.name);
    }else{
      this.bcService.set('@addType', 'Add New Product Type');
    }



  }

  initializeForm(){
    this.addTypeForm = new FormGroup({
      typeName: new FormControl('', [Validators.required])
    });
  }

  onSubmit(){
    if(this.isUpdate)
    {
      this.adminService.updateType(this.type.id, this.addTypeForm.controls.typeName.value)
      .subscribe(()=> {
        this.toastr.success("Product Type Edited Successfully");
        this.router.navigateByUrl("/admin/pannel");
      }, error => {
        console.log(error);
        this.toastr.error(error.message);
      })
    }else {
      this.adminService.addNewType(this.addTypeForm.controls.typeName.value).subscribe(() => {
        this.toastr.success("New Product Type Added");
        this.router.navigateByUrl("/admin/pannel");
      }, error => {
        console.log(error);
        this.toastr.error(error);
      });
    }
    
  }

}
