import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ShopComponent } from './shop/shop.component';
import { ProductDetailsComponent } from './shop/product-details/product-details.component';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminComponent } from './admin/admin.component';
import { AdminModule } from './admin/admin.module';
import { HomeModule } from './home/home.module';
import { ShopModule } from './shop/shop.module';
import { SharedModule } from './shared/shared.module';
import { AccountModule } from './account/account.module';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { PartShopModule } from './part-shop/part-shop.module';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './core/interceptors/loading.interceptor';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';
import { FooterComponent } from './footer/footer.component';
import { RepairRequestComponent } from './repair-request/repair-request.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { SubmitedComponent } from './contact-us/submited/submited.component';
import { ContactsComponent } from './contact-us/contacts/contacts.component';
import { ContactsDetailedComponent } from './contact-us/contacts-detailed/contacts-detailed.component';
import { RolesModalComponent } from './modals/roles-modal/roles-modal.component';
import { FrenchComponent } from './french/french.component';
import { RepairmanSelectModalComponent } from './modals/repairman-select-modal/repairman-select-modal.component';
import { RequestSubmitedComponent } from './repair-request/request-submited/request-submited.component';




@NgModule({
  declarations: [
    AppComponent,
  
    ProductDetailsComponent,
  
    AdminComponent,
  
    FooterComponent,
  
    RepairRequestComponent,
    
    ContactUsComponent,
  
    SubmitedComponent,
  
    ContactsComponent,
  
    ContactsDetailedComponent,
  
    RolesModalComponent,
  
    FrenchComponent,
  
    RepairmanSelectModalComponent,
  
    RequestSubmitedComponent,

  
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CoreModule,
    AdminModule,
    HomeModule,
    ShopModule,
    PartShopModule,
    SharedModule,
    AccountModule,
    SocialLoginModule,
    NgxSpinnerModule,

  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: 'SocialAuthServiceConfig', useValue: {
      autoLogin: false,providers: [{
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider(
          '457129431480-eme0r5m4mpu0401fhnloicdju32ajcq9.apps.googleusercontent.com'
        )
      }]
    }as SocialAuthServiceConfig,
  }
 
             ],
  bootstrap: [AppComponent]

            })
export class AppModule { }
