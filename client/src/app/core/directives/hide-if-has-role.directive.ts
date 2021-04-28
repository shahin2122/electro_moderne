import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { take } from 'rxjs/operators';
import { AccountService } from 'src/app/account/account.service';
import { IUSer } from 'src/app/shared/models/user';

@Directive({
  selector: '[appHideIfHasRole]'
})
export class HideIfHasRoleDirective implements OnInit {
@Input() appHideIfHasRole: string[];
user: IUSer;

  constructor(private viewContainerRef: ViewContainerRef,private templateRef: TemplateRef<any>,
    private accountService: AccountService) {
   this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
       this.user = user;
   
        // clear view if has roles
 if(this.user?.roles || this.user !== null) {
  this.viewContainerRef.clear();

  return;
}
if (!this.user?.roles.some(r => this.appHideIfHasRole.includes(r)))
{
  this.viewContainerRef.createEmbeddedView(this.templateRef);
  
}else {
  this.viewContainerRef.clear();

}
     })
     

}


ngOnInit(){

}

}