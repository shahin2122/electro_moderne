import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IPagination } from '../shared/models/pagination';
import {IRepairRequest } from '../shared/models/repairRequest';

import { RepairRequestParams } from '../shared/models/repairRequestParams';


@Injectable({
  providedIn: 'root'
})
export class RepairRequestService {
baseUrl = environment.baseApiUrl;

unseenReqs : number;
request: IRepairRequest;

 requestToCreate: IRepairRequest;



  constructor(private http: HttpClient) { 
    
  }

  submitNewRepairRequest(model: IRepairRequest){
    console.log("address from service = " + model.address);
    console.log("days from service = " + model.daysAvailability);
    return this.http.post(this.baseUrl + 'repairrequests', model);
  }

  getRepairRequests(requestParams: RepairRequestParams) {
    let params = new HttpParams();

    if(requestParams.search) {
      params = params.append('search', requestParams.search);
    }

    params = params.append('pageIndex', requestParams.pageNumber.toString());
    params = params.append('pageIndex', requestParams.pageSize.toString());

    return this.http.get<IPagination>(this.baseUrl + 'repairrequests', 
    {observe: 'response', params})
      .pipe(
        map(response => {
          return response.body;
        })
      );
  }

  getRepairRequest(id: number){
    return this.http.get<IRepairRequest>(this.baseUrl + 'repairrequests/' + id );
  }

  getUnseenRequestsCount(){
    return  this.http.get<number>(this.baseUrl + 'repairrequests/unseen-requests').pipe(
      map(reqs  => {
        if(reqs > 0){
          this.unseenReqs = reqs;
          return reqs;
        }
        
      })
      
    );
  }



  setRequestStatusToSeen(id: number){
    return this.http.post(this.baseUrl + 'repairrequests/update-status-seen/' + id , {});
  }
  
  setRequestStatusToAccepted(id: number){
    return this.http.post(this.baseUrl + 'repairrequests/update-status-accepted/' + id , {});
  }

  setRequestStatusToRejected(id: number){
    return this.http.post(this.baseUrl + 'repairrequests/update-status-rejected/' + id , {});
  }

  
}
