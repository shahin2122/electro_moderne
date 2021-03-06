import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUSer } from '../shared/models/user';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
 baseUrl = environment.baseApiUrl;
 private currentUserSource = new ReplaySubject<IUSer>(1);
 currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private router: Router,
    private socialAuthService: SocialAuthService) { }

 

  setCurrentUser(user: IUSer) {
    user.roles = [];
    const roles = this.getDecodedToken(user.token).role;
    Array.isArray(roles) ? user.roles = roles : user.roles.push(roles);
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
    this.router.navigateByUrl('/');
  }

  loadCurrentUser(token: string) {

    if(token === null) {
      this.currentUserSource.next(null);
      return of(null);
    }

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http.get(this.baseUrl + 'account', {headers}).pipe(
      map((user: IUSer) => {
        if(user) {
          localStorage.setItem('token', user.token);
          this.setCurrentUser(user);
        }
      })
    );
  }

login(values: any) {
  return this.http.post(this.baseUrl + 'account/login', values).pipe(
    map((user: IUSer) => {
      if(user) {
        localStorage.setItem('token', user.token);
        this.setCurrentUser(user);
        console.log(user);
      }
    })
  );
}

register(values: any) {
  values.provider = "Internal";
  return this.http.post(this.baseUrl + 'account/register', values).pipe(
    map((user: IUSer) => {
      if(user) {
        localStorage.setItem('token', user.token);
        this.setCurrentUser(user);
      }
    })
  )
}

logOut() {
  localStorage.removeItem('token');
  this.currentUserSource.next(null);
  this.router.navigateByUrl('/');
}

checkEmailExist(email: string) {
  return this.http.get(this.baseUrl + 'account/emailexists?email=' + email);
}



getDecodedToken(token) {
  return JSON.parse(atob(token.split('.')[1]));
}

googleLogin(model: any){
  return this.http.post(this.baseUrl + 'account/external-login', model).pipe(
    
    map((user: IUSer) => {
      if(user) {
        localStorage.setItem('token', user.token);
        this.setCurrentUser(user);
      
      }
      return user;
    })
  );
 }

}
