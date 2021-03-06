import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IPart } from 'src/app/shared/models/part';
import { IPartBrand } from 'src/app/shared/models/partBrand';
import { IPartType } from 'src/app/shared/models/partType';
import { AdminService } from '../../admin.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-add-new-part',
  templateUrl: './add-new-part.component.html',
  styleUrls: ['./add-new-part.component.scss']
})
export class AddNewPartComponent implements OnInit {
  addPartForm: FormGroup;
  partBrands: IPartBrand[];
  partTypes: IPartType[];
  part: IPart;


  constructor(private adminService: AdminService, private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.getBrands();
    this.getTypes();
    this.initializeForm();
  }

  getBrands() {
    this.adminService.getPartBrands().subscribe(brands => {
      this.partBrands = brands;
    })
  }

  getTypes(){
    this.adminService.getPartTypes().subscribe(types => {
      this.partTypes = types;
    })
  }

  onSubmit() {
    this.adminService.addNewPart(this.addPartForm.value).subscribe((response: IPart) => {
      this.toastr.success("New Part Added");
      this.adminService.partToAddPhoto = response;
      this.router.navigateByUrl("/admin/pannel");
    }, error => {
      console.log(error);
      this.toastr.error(error);
    })
  }

  initializeForm() {
    this.addPartForm = new FormGroup({
      Name: new FormControl('',[Validators.required]),
      Description: new FormControl('', [Validators.required]),
      Price: new FormControl('', [Validators.required]),
      Manufacturer: new FormControl('', [Validators.required]),
      PartTypeId: new FormControl('', [Validators.required]),
      PartBrandId: new FormControl('', [Validators.required]),
      Specs: new FormControl('', [Validators.required]),
      LocalId: new FormControl('', [Validators.required]),
      PartType: new FormControl(''),
      PartBrand: new FormControl(''),
    });
  }
}
