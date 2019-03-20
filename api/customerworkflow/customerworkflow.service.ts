

import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http'; 
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {WebApi} from './../api.constant';
import {CustomerworkflowElement} from'./customerworkflow.modal';
import {AccountMngrList} from'./accountmngerSelect.modal'
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class CustomerworkflowService {
  header : Headers; 
  accountmanagerList : CustomerworkflowElement[];
  accountmanagerDropdown : AccountMngrList[];
  constructor(private http : Http, private serverApi :WebApi) { 
      this.header = new Headers();
      this.header.append('Content-Type', 'application/json');
  }
  getCustomerflowList(searchCustName, searchAcctMngr): Promise<CustomerworkflowElement[]>{
    let myParams = new URLSearchParams();
    myParams.append('searchCustName', searchCustName);
    myParams.append('searchAcctMngr', searchAcctMngr);
    let option = new RequestOptions({withCredentials: true})
    return this.http.get(this.serverApi.webApi + '/NAIntgEmail/GetNAIntgEmaillist?' + myParams, option)
        .toPromise()
        .then(res => res.json() as CustomerworkflowElement[])
        .catch(this.hanerr);
  }

  getAccountflowList(): Promise<AccountMngrList[]>{
    let option = new RequestOptions({withCredentials: true})
    return this.http.get(this.serverApi.webApi + '/NAIntgEmail/GetNAIntgEmailAcctMgrsFill' , option)
        .toPromise()
        .then(res => res.json() as AccountMngrList[])
  }

  insertCustomerflowList(data : CustomerworkflowElement): Promise<CustomerworkflowElement>{ 
    let newheaders = new Headers(); 
    let myParams = new URLSearchParams();
    myParams.append('CustNbr', data.CustNbr);
    myParams.append('CustomerName', data.CustomerName);
    myParams.append('EMAILGROUP', data.EMAILGROUP);
    myParams.append('GROUPMEMBERS', data.GROUPMEMBERS);
    myParams.append('ACCTMNGR', data.ACCTMNGR);
    myParams.append('GroupExt', data.GroupExt);
    
    myParams.append('Active', null);
    myParams.append('UserID', data.UserID);
    myParams.append('LastUpdated', data.LastUpdated);
    let option = new RequestOptions({ withCredentials: true}) 
    console.log(data)
    return this.http.get(this.serverApi.webApi + '/NAIntgEmail/AddNAIntgEmailList?' + myParams, option )
        .toPromise()
        .then(res => res.json() as CustomerworkflowElement)
        .catch(this.hanerr);

          
    //newheaders.append('Content-Type', 'application/x-www-form-urlencoded');  
    // newheaders.append('Content-Type', 'application/json');  
    // newheaders.append('Access-Control-Allow-Origin','*');
    // newheaders.append('Access-Control-Allow-Credentials','*');
    // newheaders.append('Access-Control-Allow-Methods','GET,POST,DELETE,PUT,OPTIONS');
    // newheaders.append('Access-Control-Allow-Headers','*');
  }

  
  updateCustomerflowList(data : CustomerworkflowElement): Promise<CustomerworkflowElement>{ 
    let newheaders = new Headers(); 
    let myParams = new URLSearchParams();
    myParams.append('CustNbr', data.CustNbr);
    myParams.append('CustomerName', data.CustomerName);
    myParams.append('EMAILGROUP', data.EMAILGROUP);
    myParams.append('GROUPMEMBERS', data.GROUPMEMBERS);
    myParams.append('ACCTMNGR', data.ACCTMNGR);
    myParams.append('GroupExt', data.GroupExt);
    
    myParams.append('Active', null);
    myParams.append('UserID', data.UserID);
    myParams.append('LastUpdated', data.LastUpdated);
    let option = new RequestOptions({ withCredentials: true}) 
    console.log(data)
    return this.http.get(this.serverApi.webApi + '/NAIntgEmail/UpdateNAIntgEmailList?' + myParams, option )
        .toPromise()
        .then(res => res.json() as CustomerworkflowElement)
        .catch(this.hanerr);
  }
  private hanerr(err: any): Promise<any>{
    return Promise.reject(err.message || err);
  }
}