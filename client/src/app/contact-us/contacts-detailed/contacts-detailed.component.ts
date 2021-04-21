import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IContactUsRequest } from 'src/app/shared/models/contactUsRequest';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ContactUsService } from '../contact-us.service';

@Component({
  selector: 'app-contacts-detailed',
  templateUrl: './contacts-detailed.component.html',
  styleUrls: ['./contacts-detailed.component.scss']
})
export class ContactsDetailedComponent implements OnInit {
request: IContactUsRequest;

  constructor(private route: ActivatedRoute, private breadcrumbService: BreadcrumbService,
    private contactUsService: ContactUsService) { 
      this.breadcrumbService.set('@Request Details', '')
    }

  ngOnInit(): void {

    this.contactUsService.getContactRequest(+this.route.snapshot.paramMap.get('id'))
      .subscribe((request: IContactUsRequest) => {
        this.request = request;
        this.breadcrumbService.set('@Request Details', `Request# ${request.id} - ${request.fullName}`);
      })
  }


}
