import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { HasRoleDirective } from './directives/has-role.directive';
import { SectionHeaderComponent } from './section-header/section-header.component';




@NgModule({
  declarations: [NavBarComponent, HasRoleDirective, SectionHeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  exports: [NavBarComponent, 
  SectionHeaderComponent,
  ]
})
export class CoreModule { }
