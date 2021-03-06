import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-add-new-type',
  templateUrl: './add-new-type.component.html',
  styleUrls: ['./add-new-type.component.scss']
})
export class AddNewTypeComponent implements OnInit {
  addTypeForm: FormGroup;

  constructor(private adminService: AdminService, private toastr: ToastrService, 
    private router:Router) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(){
    this.addTypeForm = new FormGroup({
      typeName: new FormControl('', [Validators.required])
    });
  }

  onSubmit(){
    this.adminService.addNewType(this.addTypeForm.controls.typeName.value).subscribe(() => {
      this.toastr.success("New Product Type Added");
      this.router.navigateByUrl("/admin/pannel");
    }, error => {
      console.log(error);
      this.toastr.error(error);
    });
  }

}
