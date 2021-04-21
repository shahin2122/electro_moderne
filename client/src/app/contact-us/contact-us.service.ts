import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ContactRequestParams } from '../shared/models/contactRequestParams';
import { IContactUsRequest } from '../shared/models/contactUsRequest';
import { IPagination } from '../shared/models/pagination';

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {
baseUrl = environment.baseApiUrl;
unseenRequestsCount: number;

  constructor(private http: HttpClient) { }

  submitNewRequest(model: any){
    return this.http.post( this.baseUrl + 'contactrequests', model);
  }

  getContactRequest(id: number){
    return this.http.get<IContactUsRequest>(this.baseUrl + 'contactrequests/' + id);
  }

  getContactRequests(contactRequestParams: ContactRequestParams){
    let params = new HttpParams();

    if(contactRequestParams.search) {
      params = params.append('search', contactRequestParams.search);
    }

    params = params.append('pageIndex', contactRequestParams.pageNumber.toString());
    params = params.append('pageIndex', contactRequestParams.pageSize.toString());

    return this.http.get<IPagination>(this.baseUrl + 'contactrequests', 
    {observe: 'response', params})
      .pipe(
        map(response => {
          return response.body;
        })
      );
  }

  setRequestStatusToSeen(id: number){
    return this.http.post(this.baseUrl + 'contactrequests/update-status-seen/' + id, {});
  }


  getUnseenRequestsCount(){
    return this.http.get<number>(this.baseUrl + 'contactrequests/unseen-requests').pipe(
      map(requestsCount => {
        if(requestsCount > 0)
        this.unseenRequestsCount = requestsCount;
        return requestsCount;
      })
    )
  }
}
