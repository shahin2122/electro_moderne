import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IContactUsRequest } from '../shared/models/contactUsRequest';
import { ContactUsService } from './contact-us.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
contactUsForm: FormGroup;


  constructor(private contactService: ContactUsService, private router: Router,
      private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  } 


  initializeForm(){
    this.contactUsForm = this.fb.group({
      title: [null, Validators.required],
      email: [null, Validators.required],
      context: [null, Validators.required],
      fullName: [null, Validators.required],
      phoneNumber: [null, Validators.required],
    });
  }

  onSubmit() {
    this.contactService.submitNewRequest(this.contactUsForm.value).subscribe(
      (response: IContactUsRequest) => {
        this.router.navigateByUrl('/contact-submitted');
      }, error => {
        console.log(error);
      })
  }
}
