import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-add-new-part-brand',
  templateUrl: './add-new-part-brand.component.html',
  styleUrls: ['./add-new-part-brand.component.scss']
})
export class AddNewPartBrandComponent implements OnInit {
  addBrandForm: FormGroup;

  constructor(private adminService: AdminService, private toastr: ToastrService, 
    private router:Router) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(){
    this.addBrandForm = new FormGroup({
      brandName: new FormControl('', [Validators.required])
    });
  }

  onSubmit(){
    this.adminService.addNewPartBrand(this.addBrandForm.controls.brandName.value).subscribe(() => {
      this.toastr.success("New Part Brand Added");
      this.router.navigateByUrl("/admin/pannel");
    }, error => {
      console.log(error);
      this.toastr.error(error.error);
    });
  }

}
