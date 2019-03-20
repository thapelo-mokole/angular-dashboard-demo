import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import { WebApi } from './../api.constant';
import {User} from "./user.model";


@Injectable()
export class LoginService {
    public authenticated: boolean;
    localStorage : any;
    constructor(private  http : Http, private serverApi : WebApi){
        this.authenticated = false;
        
    }
    iAdmin(data): Promise<User>{
        const httpOptions = {
            headers: new Headers({'Content-Type': 'application/json'})
        };
        return this.http.post(this.serverApi.webApi + '/admin/slogin', JSON.stringify(data), httpOptions).toPromise()
                .then(res => {
                    const loginObj = res.json()
                    
                    if(loginObj.status){
                        console.log(loginObj)
                        localStorage.setItem("Token",loginObj.data);
                        this.authenticated = true;
                    }
                    return res.json();
                }).catch(this.handleError);
    }
    get isAuthenticated(): boolean {
        return this.authenticated;
    }

    private processLogin(data): any {
       if (data.status == true) {
          console.log(data.data);
          this.authenticated = true;
          this.localStorage.setItem('Token', data.data);
        } else {
            
        } 
        return data;
      }

      logout() {
        localStorage.removeItem('Token');
        localStorage.clear();
        this.authenticated = false;
      }

    private handleError(error : any): Promise<any> {
        return Promise.reject(error.message || error);
    }
  }

