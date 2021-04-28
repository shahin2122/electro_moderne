import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IPart } from 'src/app/shared/models/part';
import { IPartType } from 'src/app/shared/models/partType';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-add-new-part-type',
  templateUrl: './add-new-part-type.component.html',
  styleUrls: ['./add-new-part-type.component.scss']
})
export class AddNewPartTypeComponent implements OnInit {
  addTypeForm: FormGroup;
  isUpdate = false;
  type: IPartType;

  constructor(private adminService: AdminService, private toastr: ToastrService, 
    private router:Router,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.initializeForm();

    if(this.activatedRoute.snapshot.paramMap.get('id'))
    {
      this.isUpdate = true;
      this.adminService.getPartType(Number(this.activatedRoute.snapshot.paramMap.get('id')))
        .subscribe(response => {
          this.type = response;
          this.addTypeForm.get('typeName').patchValue(this.type.name);
        })
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
    this.adminService.updatePartType(this.type.id, this.addTypeForm.controls.typeName.value)
      .subscribe(() => {
        this.toastr.success("Part type Edited Successfully");
        this.router.navigateByUrl("/admin/pannel");
      }, error => {
        console.log(error);
        this.toastr.error(error);
      })
   }else{
    this.adminService.addNewPartType(this.addTypeForm.controls.typeName.value).subscribe((response : IPart) => {
      this.toastr.success("New Part Type Added");
      this.adminService.partToAddPhoto = response;
      this.router.navigateByUrl("/admin/pannel");
    }, error => {
      console.log(error);
      this.toastr.error(error.error.message);
    });
   }
  }


}
