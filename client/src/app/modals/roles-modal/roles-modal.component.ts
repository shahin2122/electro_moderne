import { Component, Input, OnInit , EventEmitter} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { IUSer } from 'src/app/shared/models/user';

@Component({
  selector: 'app-roles-modal',
  templateUrl: './roles-modal.component.html',
  styleUrls: ['./roles-modal.component.scss']
})
export class RolesModalComponent implements OnInit {
  @Input() updateSelectedRoles = new EventEmitter();
  user: IUSer;
  roles: any[];

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }


  updateRoles(){
    console.log("from modal = " + this.user.displayName);
    this.updateSelectedRoles.emit(this.roles);
    this.bsModalRef.hide();
  }
}
