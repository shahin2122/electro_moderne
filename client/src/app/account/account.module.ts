import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RregisterComponent } from './rregister/rregister.component';
import { RegisterComponent } from './register/register.component';
import { AccountRoutingModule } from './account-routing.module';



@NgModule({
  declarations: [LoginComponent, RregisterComponent, RegisterComponent],
  imports: [
    CommonModule,
    AccountRoutingModule
  ]
})
export class AccountModule { }
