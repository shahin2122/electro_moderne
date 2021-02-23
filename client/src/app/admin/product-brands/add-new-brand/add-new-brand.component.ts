import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-add-new-brand',
  templateUrl: './add-new-brand.component.html',
  styleUrls: ['./add-new-brand.component.scss']
})
export class AddNewBrandComponent implements OnInit {
 addBrandForm: FormGroup;


  constructor(private adminService: AdminService, private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.addBrandForm = new FormGroup({
      brandName: new FormControl('', [Validators.required])
    });
  }

  onSubmit() {
    this.adminService.addNewBrand(this.addBrandForm.controls.brandName.value).subscribe(() => {
      this.toastr.success("New Product Brand Added");
      this.router.navigateByUrl("/admin/pannel");
    }, error => {
      console.log(error);
      this.toastr.error(error.error);
    });
  }
}
