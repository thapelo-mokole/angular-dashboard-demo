




import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {WebApi} from './../api.constant';
import {AccountmanagerElement} from'./accountmanager.modal'
import {OpmangerSelect} from'./opmngrSelect.modal'

@Injectable()
export class AccountmanagerService {
  header : Headers; 
  accountmanagerList : AccountmanagerElement[];
  constructor(private http : Http, private serverApi :WebApi) { 
      this.header = new Headers();
      this.header.append('Content-Type', 'application/json')
  }
  //List All Data Display
  getAccountmanagerList(): Promise<AccountmanagerElement[]>{
    // let newheaders = new Headers();
    // newheaders.append('Content-Type', 'application/json');
    // newheaders.append('Access-Control-Allow-Origin', ' *');
    // newheaders.append('Access-Control-Allow-Methods','GET, POST, DELETE, PUT');
    let option = new RequestOptions({withCredentials: true })  
    return this.http.get(this.serverApi.webApi + '/AccountMgr/GetAccountMgrlist', option)
        .toPromise()
        .then(res => res.json() as AccountmanagerElement[])
        .catch(this.hanerr);
  }


  //Op Manager Drop down Field
  getOpmnagrselectList(): Promise<OpmangerSelect[]>{
    let option = new RequestOptions({withCredentials: true})
    return this.http.get(this.serverApi.webApi + '/AccountMgr/GetAcctMgroperationmngrFill' , option)
        .toPromise()
        .then(res => res.json() as OpmangerSelect[])
  }

  
  //Insert Data Display
  insertAccountmanagerList(data): Promise<AccountmanagerElement>{
    let myParams = new URLSearchParams();
    myParams.append('AcctMngr', data.AcctMngr);
    myParams.append('AcctMngrInitials', data.AcctMngrInitials);
    myParams.append('Active', data.Active);
    myParams.append('EMPLOYID', null);
    myParams.append('OpManager', data.OpManager);

    
    let option = new RequestOptions({withCredentials: true})
    return this.http.get(this.serverApi.webApi + '/AccountMgr/AddAccountMgrList?' + myParams, option)
        .toPromise()
        .then(res => res.json() as AccountmanagerElement)
        .catch(this.hanerr);
  }

  //Update Data Display
  updateAccountmanagerList(data): Promise<AccountmanagerElement>{
    let myParams = new URLSearchParams();
    myParams.append('AcctMngr', data.AcctMngr);
    myParams.append('AcctMngrInitials', data.AcctMngrInitials);
    myParams.append('Active', data.Active);
    myParams.append('EMPLOYID', null);
    myParams.append('OpManager', data.OpManager);
 
    let option = new RequestOptions({withCredentials: true})
    return this.http.get(this.serverApi.webApi + '/AccountMgr/UpdateAccountMgrList?' + myParams, option)
        .toPromise()
        .then(res => res.json() as AccountmanagerElement)
        .catch(this.hanerr);
  }

  private hanerr(err: any): Promise<any>{
    return Promise.reject(err.message || err);
  }
}
