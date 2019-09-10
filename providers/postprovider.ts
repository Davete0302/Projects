import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
// import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';


@Injectable()
export class PostProvider{
    //   server: string = "http://localhost/backend/";
    server: string = "https://cirfund.org/server_api/";
    constructor(public http: Http){}
    
    postData(body, file){
        let type = 'application/json;charset=UTF-8';
        let headers = new Headers({'content-type': type});
        let options = new RequestOptions({ headers:headers });
        
        return this.http.post(this.server + file, JSON.stringify(body), options).pipe(map(res => res.json()));
    }
}