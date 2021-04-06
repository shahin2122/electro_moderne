import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './core/guards/admin.guard';
import { AuthGuard } from './core/guards/auth.guard';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';
import { TestErrorComponent } from './core/test-error/test-error.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './shop/product-details/product-details.component';
import { ShopComponent } from './shop/shop.component';

const routes: Routes = [
    {path: '', component: HomeComponent, data: {breadcrumb: 'Home'}},
    {path: 'test-error', component: TestErrorComponent, data: {breadcrumb: 'Test Errors'}},
    {path: 'server-error', component: ServerErrorComponent, data: {breadcrumb: 'Server Error'}},
    {path: 'not-found', component: NotFoundComponent, data: {breadcrumb: 'Not Found'}},

    {path:'', 
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
     
      {path: 'admin', loadChildren: () => import('./admin/admin.module')
        .then(mod => mod.AdminModule), canActivate: [AdminGuard] },
      {path: 'order', loadChildren: () => import('./order/order.module')
        .then(mod => mod.OrderModule), data: { breadcrumb: 'Orders'}},
    ]
    },

    {path: 'shop', loadChildren: () => import('./shop/shop.module')
      .then(mod => mod.ShopModule) , data: {breadcrumb: 'Appliance Shop'}},

    {path: 'part-shop', loadChildren: () => import('./part-shop/part-shop.module')
      .then(mod => mod.PartShopModule), data: {breadcrumb: 'Part Shop'}},

    {path: 'account', loadChildren: () => import('./account/account.module')
      .then(mod => mod.AccountModule) , data: {breadcrumb: 'Account'}},

    {path: 'basket', loadChildren: () => import('./basket/basket.module')
      .then(mod => mod.BasketModule), data: {breadcrumb: 'Basket'}},
    
    {path: 'checkout', loadChildren: () => import('./checkout/checkout.module')
      .then(mod => mod.CheckoutModule), data: {breadcrumb: 'Checkout'}},

    {path: '**', redirectTo : '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
