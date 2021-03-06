import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../account.service';
import { SocialAuthService } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  returnUrl: string;
  externalUser: any;
  validationErrors: string[] = [];
  
  constructor(private accountService: AccountService, private router: Router,private socialAuthService: SocialAuthService,
    private toastr: ToastrService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl || '/shop';
    this.initializeLoginForm();
  }

  initializeLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators
      .pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit()
  {
    this.accountService.login(this.loginForm.value).subscribe(() => {
    
     this.router.navigateByUrl('/shop');
    
    }, error => {
      console.log(error);
      this.toastr.error(error.error);
    });
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
