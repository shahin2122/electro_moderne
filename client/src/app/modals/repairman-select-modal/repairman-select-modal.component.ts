import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-repairman-select-modal',
  templateUrl: './repairman-select-modal.component.html',
  styleUrls: ['./repairman-select-modal.component.scss']
})
export class RepairmanSelectModalComponent implements OnInit {
  title: string;
  list: any[] = [];
  closeBtnName: string;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

}
