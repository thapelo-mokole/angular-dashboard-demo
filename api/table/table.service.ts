

import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {WebApi} from './../api.constant';

import {PeriodicElement} from'./table.modal'

@Injectable()
export class StudentService {

   header : Headers; 
  selectedEmployee : PeriodicElement;
  employeeList : PeriodicElement[];
  constructor(private http : Http, private serverApi :WebApi) { 
      this.header = new Headers();
      this.header.append('Content-Type', 'application/json')
  }

  // postEmployee(emp : PeriodicElement){
    // return this.http.post('http://localhost:28750/api/Employee',body,requestOptions).map(x => x.json());
  // }

//   putEmployee(id, emp) {
//     var body = JSON.stringify(emp);
//     var headerOptions = new Headers({ 'Content-Type': 'application/json' });
//     var requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
//     return this.http.put('http://localhost:28750/api/Employee/' + id,
//       body,
//       requestOptions).map(res => res.json());
//   }

    getEmployeeList(): Promise<PeriodicElement[]>{
        return this.http.get(this.serverApi.webApi + '/Employee')
            .toPromise()
            .then(res => res.json() as PeriodicElement[])
            .catch(this.hanerr);
    }

    deleteEmployee(id: number) {
        return this.http.delete(this.serverApi.webApi + '/Employee/' + id)
            .toPromise()
            .then(res => res.json() as PeriodicElement)
            .catch(this.hanerr);
    }

    private hanerr(err: any): Promise<any>{
       console.log(err)
       return Promise.reject(err.message || err);
    }
}

