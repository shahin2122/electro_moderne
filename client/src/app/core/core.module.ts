import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { HasRoleDirective } from './directives/has-role.directive';
import { SectionHeaderComponent } from './section-header/section-header.component';
import { TestErrorComponent } from './test-error/test-error.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { HideIfHasRoleDirective } from './directives/hide-if-has-role.directive';




@NgModule({
  declarations: [NavBarComponent, HasRoleDirective, SectionHeaderComponent, TestErrorComponent, NotFoundComponent, ServerErrorComponent, HideIfHasRoleDirective],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    BreadcrumbModule
  ],
  exports: [NavBarComponent, 
  SectionHeaderComponent,
  ]
})
export class CoreModule { }
