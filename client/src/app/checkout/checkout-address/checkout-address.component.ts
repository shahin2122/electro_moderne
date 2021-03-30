import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/account/account.service';


@Component({
  selector: 'app-checkout-address',
  templateUrl: './checkout-address.component.html',
  styleUrls: ['./checkout-address.component.scss']
})
export class CheckoutAddressComponent implements OnInit {
  @Input() checkoutForm: FormGroup;
  address1: string;
  address2: string;
  constructor(private accountService: AccountService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAddressFormValue();
  }

  saveUserAddress() {
   this.accountService.updateUserAddress(this.checkoutForm.get('addressForm').value)
    .subscribe(() => {
      this.toastr.success('Address Saved');
    }, error => {
            this.toastr.error(error.message)
    });
  }

  getAddressFormValue() {

    this.accountService.getUserAddress().subscribe((response) => {
      this.address1 = response.address1;
      this.address2 = response.address2;

      if(this.address1) {
        this.checkoutForm.get('addressForm').get('address1').patchValue(this.address1);
      }
      if(this.address2) {
        this.checkoutForm.get('addressForm').get('address2').patchValue(this.address2);
      }
    });

    
     
    
  }
}
