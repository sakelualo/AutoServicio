import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpRequest, HttpParams } from '@angular/common/http';
import { isNull } from 'util';
import { Observable } from 'rxjs';
import { RespuestaServicio } from '../models/respuesta-servicio';

interface QueryParams {
  [key: string]: string | number;
}

@Injectable({
  providedIn: 'root'
})
export class BusgenericserviceService {
  private readonly END_POINT: string; // usually get this from enviroment !!


  constructor(private http: HttpClient) {
    this.END_POINT = 'https://desabus.edomex.gob.mx/bussrv/sei';
  }


  postPatch<T>(
    route: string,
    data: any,
    id: number = null,
    method: 'post' | 'patch' = 'post',
    qp: QueryParams = {}
  ): Observable<T> {
    const cfqu = this.correctFormatForQueryUrl(qp);
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' +
      btoa(environment.TOKEN_AUTH_USERNAME + ':' + environment.TOKEN_AUTH_PASSWORD));
    headers = headers.append('Content-Type', 'application/json');
    return this.http[method](
      `${this.END_POINT}/${route}${id ? '/' + id : ''}${cfqu}`,
      data, { headers }
    ) as Observable<T>;
  }

  getRemove<T>(
    id: number | null,
    route: string,
    qp: QueryParams = {},
    method: 'get' | 'delete' = 'get'
  ): Observable<T> {
    const cfqu = this.correctFormatForQueryUrl(qp);
    return this.http[method](
      `${this.END_POINT}/${route}${id ? '/' + id : ''}${cfqu}`
    ) as Observable<T>;
  }


  private correctFormatForQueryUrl(qp: QueryParams): string {
    if (isNull(qp)) {
      return '';
    }
    const qpAsStr = this.mapQueryParamsToUrl(qp);
    return qpAsStr.length === 0 ? '' : `?${qpAsStr.join('&')}`;
  }

  private mapQueryParamsToUrl(qp: QueryParams): Array<string> {
    return Object.keys(qp).map((key: string) => {
      return `${key}=${qp[key]}`;
    });
  }

  getResponseJSONObject(objetJSON: any): any {
    var myJSON = JSON.stringify(objetJSON);
    let jsonObj: any = JSON.parse(myJSON);
    let fObj: RespuestaServicio = <RespuestaServicio>jsonObj;
    var arrayJSON: any[] = [];
    for (let gh of fObj.response) {
      var myJSON = JSON.stringify(gh);
      let jsonObj: any = JSON.parse(myJSON);
      arrayJSON.push(jsonObj);
    }
    return arrayJSON;
  }
}
