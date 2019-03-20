import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { WebApi } from './../api.constant';
import { AdgroupsElement } from './adgroup.modal';
import { AdgroupsDialogElement } from './adgroupview.modal';
import { Options } from 'selenium-webdriver/chrome';

@Injectable()
export class AdgroupsService {
  header: Headers;
  fileheader: Headers;
  options: RequestOptions;
  fileoptions: RequestOptions;
  selectedAdgroup: AdgroupsElement;
  adgroupList: AdgroupsElement[];
  adgroupDialogList: AdgroupsDialogElement[];
  constructor(private http: Http, private serverApi: WebApi) {
    this.header = new Headers();
    this.header.append('Content-Type', 'application/json');
    this.options = new RequestOptions({ headers: this.header });
  }

  // insert 
  insertAccountmanagerList(data): Promise<AdgroupsElement> {
    // var submitData = {
    //   name : data.NAME,
    //   skuname : data.SKUNAME
    // }
    this.fileheader = new Headers();
    this.fileoptions = new RequestOptions({ headers: this.fileheader });
    return this.http.post(this.serverApi.webApi + '/admin/apis', data, this.fileoptions)
      .toPromise()
      .then(res => res.json() as AdgroupsElement)
      .catch(this.hanerr);
  }

  getAdgroupsList(): Promise<AdgroupsElement[]> {
    return this.http.get(this.serverApi.webApi + '/admin/apis', this.options)
      .toPromise()
      .then(res => res.json().data as AdgroupsElement[])
      .catch(this.hanerr);
  }




  //Update Data Display
  updateAccountmanagerList(data): Promise<AdgroupsElement> {
    var id = data.ID;
    var submitData = {
      name: data.NAME,
      imageurl: data.IMAGE_URL,
      path: data.PATH
    }

    return this.http.put(this.serverApi.webApi + '/admin/apis/' + id, submitData, this.options)
      .toPromise()
      .then(res => res.json() as AdgroupsElement)
      .catch(this.hanerr);
  }

  deletegroupList(data): Promise<AdgroupsElement> {
    var id = data.ID;
    return this.http.delete(this.serverApi.webApi + '/admin/apis/' + id, this.options)
      .toPromise()
      .then(res => res.json() as AdgroupsElement)
      .catch(this.hanerr);
  }

  //Update Data Active Data
  updateActiveList(data): Promise<AdgroupsElement> {
    var isactive = data.ISACTIVE == true ? false : true;
    var submitData = {
      id: data._id,
      active: isactive
    }
    return this.http.put(this.serverApi.webApi + '/admin/apis', submitData, this.options)
      .toPromise()
      .then(res => res.json() as AdgroupsElement)
      .catch(this.hanerr);
  }

  insertAdgroupservice(data): Promise<AdgroupsDialogElement> {

    var id = data.mainId;
    this.fileheader = new Headers();
    this.fileoptions = new RequestOptions({ headers: this.fileheader });
    var insertChild = {
      key: data.KEY,
      keyseqid: data.NO,
      value: data.VALUE
    }
    return this.http.post(this.serverApi.webApi + '/admin/keyword/' + id, insertChild, this.fileoptions)
      .toPromise()
      .then(res => res.json() as AdgroupsElement)
      .catch(this.hanerr);
  }


  updateAdgroupservice(data): Promise<AdgroupsDialogElement> {
    var submitData = {
      mainId: data.mainId,
      keyid: data._id,
      value: data.VALUE
    }
    return this.http.put(this.serverApi.webApi + '/admin/keyword', submitData, this.options)
      .toPromise()
      .then(res => res.json() as AdgroupsDialogElement)
      .catch(this.hanerr);
  }

  deleteChildAdgroupservice(data): Promise<AdgroupsDialogElement> {
    var mainId = data.mainId;
    var submitData = {
      keyid: data._id
    }

    return this.http.put(this.serverApi.webApi + '/admin/keyword/' + mainId, submitData, this.options)
      .toPromise()
      .then(res => res.json() as AdgroupsDialogElement)
      .catch(this.hanerr);
  }

  barChart() {
    return this.http.get(this.serverApi.webApi + '/admin/keyword' , this.options)
      .toPromise()
      .then(res => res.json())
      .catch(this.hanerr);
  }


  private hanerr(err: any): Promise<any> {
    return Promise.reject(err.message || err);
  }
}