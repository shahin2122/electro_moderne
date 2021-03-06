import { Component, OnInit } from '@angular/core';
import { AsyncValidatorFn, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { of, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AccountService } from '../account.service';
import { SocialAuthService } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errors: string[] = [];
  externalUser: any;


  constructor(private fb: FormBuilder, private accountService: AccountService, private router: Router,
    private toastr: ToastrService, private socialAuthService: SocialAuthService) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }


  createRegisterForm() {
    this.registerForm = this.fb.group({
      displayName: [null, [Validators.required]],
      email: [null,  [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')],
              [this.validateEmailNotTaken()]
             ],
      password: [null, [Validators.required]]
    });
  }

  onSubmit() {
   this.accountService.register(this.registerForm.value).subscribe(response => {
     this.router.navigateByUrl('/shop');
   }, error => {
     console.log(error);
     this.errors = error.error.errors;
     this.toastr.error(error.error);
   });
  }

  validateEmailNotTaken(): AsyncValidatorFn {
    return control => {
      return timer(500).pipe(
        switchMap(() => {
          if(!control.value) {
            return of(null);
          }
          return this.accountService.checkEmailExist(control.value).pipe(
            map(res => {
              return res ? {emailExists: true} : null;
            })
          );
        })
      );
    };
  }

  logInWithGoogle(platform: string): void {
    
    platform = GoogleLoginProvider.PROVIDER_ID;
   
    this.socialAuthService.signIn(platform).then(
    (response) => {
     
    // this.externalUser = response;
      this.externalUser = {
          id : response.id,
          email : response.email,
          username: response.name,
          firstName: response.firstName,
          lastName: response.lastName,
          pictureUrl: response.photoUrl,
          provider: response.provider,
        };
      
      console.log(this.externalUser);
        this.accountService.googleLogin(this.externalUser).subscribe();
      });
     
  }
}
