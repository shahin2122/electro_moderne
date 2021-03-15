import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartShopComponent } from './part-shop.component';
import { PartDetailsComponent } from './part-details/part-details.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', component: PartShopComponent},
  {path: ':id', component: PartDetailsComponent}
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
