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
import { AllBlogsComponent } from './all-blogs/all-blogs.component';
import { BlogDetailsComponent } from './all-blogs/blog-details/blog-details.component';
import { QuillModule } from 'ngx-quill';





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
    
    AllBlogsComponent,

    BlogDetailsComponent,

    
  
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
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
    QuillModule.forRoot(),
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: 'googleTagManagerId', useValue:'GTM-P77PQHC'},
    
  
             ],
  bootstrap: [AppComponent]

            })
export class AppModule { }
