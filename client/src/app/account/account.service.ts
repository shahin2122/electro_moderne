import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUSer } from '../shared/models/user';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { IAddress } from '../shared/models/address';


@Injectable({
  providedIn: 'root'
})
export class AccountService {
 baseUrl = environment.baseApiUrl;
 private currentUserSource = new ReplaySubject<IUSer>(1);
 currentUser$ = this.currentUserSource.asObservable();
 user: IUSer;


  constructor(private http: HttpClient, private router: Router,
   ) { }

 

  setCurrentUser(user: IUSer) {
    user.roles = [];
    const roles = this.getDecodedToken(user.token).role;
    Array.isArray(roles) ? user.roles = roles : user.roles.push(roles);
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
    this.user = user;
    this.router.navigateByUrl('/');
  }

  loadCurrentUser(token: string) {

    if(token === null) {
      this.currentUserSource.next(null);
      return of(null);
    }

  // let headers = new HttpHeaders();
  //  headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http.get(this.baseUrl + 'account').pipe(
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



 getUserAddress(){
   return this.http.get<IAddress>(this.baseUrl + 'account/address');
 }

 updateUserAddress(NewAddress: IAddress) {
  return this.http.post<IAddress>(this.baseUrl + 'account/address', NewAddress);
 }

 

}
