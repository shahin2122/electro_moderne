import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IPart } from 'src/app/shared/models/part';
import { IPartBrand } from 'src/app/shared/models/partBrand';
import { IPartType } from 'src/app/shared/models/partType';
import { AdminService } from '../../admin.service';

import { ActivatedRoute, Router } from '@angular/router';

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
  isUpdate = false;

  constructor(private adminService: AdminService, private toastr: ToastrService,
    private router: Router,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getBrands();
    this.getTypes();
    this.initializeForm();

    if(this.activatedRoute.snapshot.paramMap.get('id'))
    {
      this.isUpdate = true;
      this.adminService.getPart(Number(this.activatedRoute.snapshot.paramMap.get('id')))
        .subscribe(response => {
          this.part = response;
          this.addPartForm.get('Name').patchValue(this.part.name);
          this.addPartForm.get('Description').patchValue(this.part.description);
          this.addPartForm.get('Price').patchValue(this.part.price);
          this.addPartForm.get('Manufacturer').patchValue(this.part.manufacturer);
          this.addPartForm.get('Specs').patchValue(this.part.specs);
          this.addPartForm.get('LocalId').patchValue(this.part.localId);
          this.addPartForm.get('PartNumber').patchValue(this.part.partNumber);
          this.addPartForm.get('PartBrandId').patchValue(this.part.partBrand);
          this.addPartForm.get('PartTypeId').patchValue(this.part.partType);
        })
    }

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
    if(this.isUpdate){
      this.adminService.updatePart(Number(this.activatedRoute.snapshot.paramMap.get('id')), this.part)
        .subscribe((response : IPart) => {
          this.toastr.success("Part Updated");
          this.adminService.partToAddPhoto = response;
          this.router.navigateByUrl("/admin/part-photo-editor/" + response.id);
        }, error => {
          console.log(error);
          this.toastr.error(error.message);
        })
    }else{
      this.adminService.addNewPart(this.addPartForm.value).subscribe((response: IPart) => {
        this.toastr.success("New Part Added");
        this.adminService.partToAddPhoto = response;
        this.router.navigateByUrl("/admin/part-photo-editor/" + response.id);
      }, error => {
        console.log(error);
        this.toastr.error(error.message);
      })
    }
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
      PartNumber: new FormControl('', [Validators.required]),
      PartType: new FormControl(''),
      PartBrand: new FormControl(''),
    });
  }
}
