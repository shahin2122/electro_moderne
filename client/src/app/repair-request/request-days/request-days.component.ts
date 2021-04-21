import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IDaysAvailable } from 'src/app/shared/models/repairRequest';
import { RepairRequestService } from '../repair-request.service';

@Component({
  selector: 'app-request-days',
  templateUrl: './request-days.component.html',
  styleUrls: ['./request-days.component.scss']
})
export class RequestDaysComponent implements OnInit {
  @Input() repairRequestForm: FormGroup;
  days: IDaysAvailable[] ;
  daysSelected : IDaysAvailable[] = [];

  constructor(private requestService: RepairRequestService) { }

  ngOnInit(): void {
   this.getDaysAvailable();
  }

  getDaysAvailable(){
    this.requestService.getDaysAvailable().subscribe(response => {
      this.days = response;
      console.log(response);
    });
  }

  onClicked(day: IDaysAvailable){
    let days = this.daysSelected;
    if(days.some(x => x.id === day.id)){
    days = days.filter(i => i.id !== day.id);
 
    }else{
      days.push(day);
    
    }
    this.daysSelected = days;
console.log(this.daysSelected);
  }

 

  onFinished(){
    this.requestService.setDays(this.daysSelected);
  }
}
