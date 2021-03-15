import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './core/guards/admin.guard';
import { AuthGuard } from './core/guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './shop/product-details/product-details.component';
import { ShopComponent } from './shop/shop.component';

const routes: Routes = [
    {path: '', component: HomeComponent},

    {path:'', 
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
     
      {path: 'admin', loadChildren: () => import('./admin/admin.module')
      .then(mod => mod.AdminModule), canActivate: [AdminGuard] },
    ]
    },

    {path: 'shop', loadChildren: () => import('./shop/shop.module')
      .then(mod => mod.ShopModule)},

    {path: 'part-shop', loadChildren: () => import('./part-shop/part-shop.module')
      .then(mod => mod.PartShopModule)},

    {path: 'account', loadChildren: () => import('./account/account.module')
      .then(mod => mod.AccountModule)},

    {path: 'basket', loadChildren: () => import('./basket/basket.module')
      .then(mod => mod.BasketModule)},
    
    {path: 'checkout', loadChildren: () => import('./checkout/checkout.module')
      .then(mod => mod.CheckoutModule)},

    {path: '**', redirectTo : '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
