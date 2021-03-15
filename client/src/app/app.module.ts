import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
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


@NgModule({
  declarations: [
    AppComponent,
  
    ProductDetailsComponent,
  
    AdminComponent,
  
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
    SocialLoginModule
  ],
  providers: [
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
  bootstrap: [AppComponent],

            })
export class AppModule { }
