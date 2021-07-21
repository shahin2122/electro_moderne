import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RepairRequestService } from 'src/app/repair-request/repair-request.service';
import { IRepairRequest } from 'src/app/shared/models/repairRequest';
import { BreadcrumbService } from 'xng-breadcrumb';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-request-detailed',
  templateUrl: './request-detailed.component.html',
  styleUrls: ['./request-detailed.component.scss']
})
export class RequestDetailedComponent implements OnInit {
request: IRepairRequest;

  constructor(private route: ActivatedRoute, private breadcrumbService: BreadcrumbService,
    private repairRequestService: RepairRequestService, private adminService : AdminService) {
      this.breadcrumbService.set('@Request Detailed', '')
     }

  ngOnInit(): void {
    
    this.repairRequestService.getRepairRequest(+this.route.snapshot.paramMap.get('id'))
      .subscribe((req: IRepairRequest) => {
        this.request = req;
        this.breadcrumbService.set('@Request Detailed', `Request# ${req.id} - ${req.fullName}`);
        console.log(req);
      }, error => {
        console.log(error);
      })

      this.getRepairmans();
      
  }

  onAccept(){
    this.repairRequestService.setRequestStatusToAccepted(this.request.id).subscribe();
  }

  onReject(){
    this.repairRequestService.setRequestStatusToRejected(this.request.id).subscribe();
  }

  getRepairmans(){
    this.adminService.getRepairmans().subscribe();
  }
}
