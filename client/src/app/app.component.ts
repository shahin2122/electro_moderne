import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountService } from './account/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Electro Moderne';

  constructor(private accountService: AccountService) {}

  ngOnInit(){
    this.loadCurrentUser();
  }

  loadCurrentUser() {
    const token = localStorage.getItem('token');
   
      this.accountService.loadCurrentUser(token).subscribe(() => {
       
      }, error => {
        console.log(error);
      });
    }
  }

