import {Injectable} from "@angular/core";

@Injectable()
export class WebApi {
    public urlServer: string = 'http://localhost:2002';
    public versionNo: string = '/v1';
    public webApi: string = this.urlServer + this.versionNo;
}