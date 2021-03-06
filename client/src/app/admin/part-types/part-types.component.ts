import { Component, OnInit } from '@angular/core';
import { IPartType } from 'src/app/shared/models/partType';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-part-types',
  templateUrl: './part-types.component.html',
  styleUrls: ['./part-types.component.scss']
})
export class PartTypesComponent implements OnInit {
  types: IPartType[];
  pageNumber = 1;
  pageSize = 10;
  totalCount: number;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.getTypes();
  }

  getTypes() {
    this.adminService.getPartTypesPaginated(this.pageNumber, this.pageSize).subscribe(response => {
      this.types = response.data;
      this.pageNumber = response.pageIndex;
      this.pageSize = response.pageSize;
      this.totalCount = response.count;
    })
  }

  onPageChanged(event: any) {
    if(this.pageNumber !== event){
      this.pageNumber = event;
      this.getTypes();
    }
  }
}
