import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IPart } from 'src/app/shared/models/part';
import { PartsParams } from 'src/app/shared/models/PartsParams';
import { ShopService } from 'src/app/shop/shop.service';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-parts',
  templateUrl: './parts.component.html',
  styleUrls: ['./parts.component.scss']
})
export class PartsComponent implements OnInit {
  parts: IPart[];
  totalCount: number;
  partsParams = new PartsParams();

  constructor(private adminService: AdminService, private router: Router,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getParts();
  }

  getParts() {
    this.adminService.getParts(this.partsParams)
      .subscribe(response => {
        this.parts = response.data;
        this.partsParams.pageNumber = response.pageIndex;
        this.partsParams.pageSize = response.pageIndex;
        this.partsParams.pageSize = response.pageSize;
        this.totalCount = response.count;
      })
  }

  setPartToAddPhoto(part: IPart) {
    this.adminService.partToAddPhoto = part;
    this.router.navigateByUrl("/admin/part-photo-editor/"+ part.id);
    console.log("part  =" + part.id);
  }

  onPageChanged(event:any) {
    if(this.partsParams.pageNumber !== event){
      this.partsParams.pageNumber = event;
      this.getParts();
    }
  }

  deletePart(id: number){
    this.adminService.deletePart(id).subscribe(()=> {
      this.toastr.success("Part Deleted");
      this.getParts();
    }, error => {
      this.toastr.error(error.message);
      console.log(error);
    })
  }
}
