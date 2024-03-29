import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartShopComponent } from './part-shop.component';
import { PartDetailsComponent } from './part-details/part-details.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', component: PartShopComponent},
  {path: ':typeIdFromNav', component: PartShopComponent, data: {breadcrumb: {aliad:'Part Shop'}}},
  {path: 'part-details/:id', component: PartDetailsComponent, data: {breadcrumb: {alias: 'partDetails'}}}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class PartShopRoutingModule { }
