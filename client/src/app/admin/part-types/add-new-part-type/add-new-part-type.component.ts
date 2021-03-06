import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-add-new-part-type',
  templateUrl: './add-new-part-type.component.html',
  styleUrls: ['./add-new-part-type.component.scss']
})
export class AddNewPartTypeComponent implements OnInit {
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
    this.adminService.addNewPartType(this.addTypeForm.controls.typeName.value).subscribe(() => {
      this.toastr.success("New Part Type Added");
      this.router.navigateByUrl("/admin/pannel");
    }, error => {
      console.log(error);
      this.toastr.error(error.error);
    });
  }


}
