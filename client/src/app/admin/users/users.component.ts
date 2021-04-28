import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { RolesModalComponent } from 'src/app/modals/roles-modal/roles-modal.component';
import { IPagination } from 'src/app/shared/models/pagination';
import { IUSer } from 'src/app/shared/models/user';
import { UserParams } from 'src/app/shared/models/usersParams';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
users: IUSer[];
bsModalRef: BsModalRef;
userParams = new UserParams();
totalCount : number;

  constructor(private adminService: AdminService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getUsersWithRoles();
  }


  getUsersWithRoles() {
    this.adminService.getUsersWithRoles(this.userParams)
    .subscribe(response  => {
      this.users = response.data;
      this.userParams.pageNumber = response.pageIndex;
      this.userParams.pageSize = response.pageSize;
      this.totalCount = response.count;
    })
  }

  openRolesModal(user : IUSer) {

    const config = {
      class: 'modal-dialog-centered',
      initialState: {
        user,
        roles : this.getRolesArray(user)
      }
    }
    this.bsModalRef = this.modalService.show(RolesModalComponent, config);
    this.bsModalRef.content.updateSelectedRoles.subscribe(values => {
      const rolesToUpdate = {
        roles: [...values.filter(el => el.checked === true).map(el => el.name)]
      };
      if(rolesToUpdate) {
        this.adminService.updateUserRoles(user.email, rolesToUpdate.roles).subscribe(() => {
          user.roles = [...rolesToUpdate.roles]
       
        })
      }
    });
  }

  onPageChanged(event: any) {
    if(this.userParams.pageNumber !== event){
      this.userParams.pageNumber = event;
      this.getUsersWithRoles();
    }
  }


  private getRolesArray(user){
    const roles = [];
    const userRoles = user.roles;
    const availableRoles: any[] = [
      {name: 'Admin', value: 'Admin'},
      {name: 'RepairMan', value: 'RepairMan'},
      {name: 'Member', value: 'Member'},
    ];

    availableRoles.forEach(role => {
      let isMatch = false;
      for(const userRole of userRoles) {
        if(role.name === userRole) {
          isMatch = true;
          role.checked = true;
          roles.push(role);
          break;
        }
      }
      if(!isMatch){
        role.checked = false;
        roles.push(role);
      }
    })
    return roles;
  }
} 
