import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { RepairRequestService } from 'src/app/repair-request/repair-request.service';
import { IRepairRequest } from 'src/app/shared/models/repairRequest';
import { RepairRequestParams } from 'src/app/shared/models/repairRequestParams';

@Component({
  selector: 'app-repair-requests',
  templateUrl: './repair-requests.component.html',
  styleUrls: ['./repair-requests.component.scss']
})
export class RepairRequestsComponent implements OnInit {
  @ViewChild('search', {static: false}) searchTerm: ElementRef
  requests: IRepairRequest[];
  requestParams = new RepairRequestParams();
  totalCount: number;
  reqToSetStatusToSeen: IRepairRequest;

  constructor(private repairRequestService: RepairRequestService, private router: Router) { }

  ngOnInit(): void {
    this.getRequests();
  }

  getRequests(){
    this.repairRequestService.getRepairRequests(this.requestParams).subscribe(response => {
      this.requests = response.data;
      this.requestParams.pageNumber = response.pageIndex;
      this.requestParams.pageSize = response.pageSize;
      this.totalCount = response.count;
    }, error => {
      console.log(error);
    });
  }

  onSearch() {
    this.requestParams.search = this.searchTerm.nativeElement.value;
    this.requestParams.pageNumber = 1;
    this.getRequests();
  }

  onPageChanged(event:any) {
    if(this.requestParams.pageNumber !== event){
      this.requestParams.pageNumber = event;
      this.getRequests();
    }
  }

  onClicked(id: number){
    this.repairRequestService.getRepairRequest(id).subscribe((response: IRepairRequest) => {
      this.reqToSetStatusToSeen = response;
      if(response.status === "Unseen"){
        this.repairRequestService.setRequestStatusToSeen(id).subscribe();
      }
      this.router.navigateByUrl("requests/" + id);
    })
    

    
  }

 
}
