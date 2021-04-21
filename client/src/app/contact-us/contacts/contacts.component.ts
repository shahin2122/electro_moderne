import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ContactRequestParams } from 'src/app/shared/models/contactRequestParams';
import { IContactUsRequest } from 'src/app/shared/models/contactUsRequest';
import { ContactUsService } from '../contact-us.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  @ViewChild('search', {static: false}) searchTerm: ElementRef
  requests: IContactUsRequest[];
  requestParams = new ContactRequestParams();
  totalCount: number;
  reqToSetStatusToSeen: IContactUsRequest;


  constructor(private contactSevice: ContactUsService, private router: Router) { }

  ngOnInit(): void {
    this.getRequests();
  }
    getRequests(){
      this.contactSevice.getContactRequests(this.requestParams).subscribe(response => {
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

  onClick(id: number){
    this.contactSevice.getContactRequest(id).subscribe((response: IContactUsRequest) => {
      this.reqToSetStatusToSeen = response;
      if(response.status === "Unseen"){
        this.contactSevice.setRequestStatusToSeen(id).subscribe();
      }
      this.router.navigateByUrl("contacts/" + id);
    })
  }
}
