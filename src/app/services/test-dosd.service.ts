import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isNull } from 'util';

interface QueryParams {
  [key: string]: string | number;
}

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}


@Injectable({
  providedIn: 'root'
})
export class TestDosdService {
  private readonly END_POINT: string; // usually get this from enviroment !!

  constructor(private http: HttpClient) {
    this.END_POINT = 'https://jsonplaceholder.typicode.com';
  }

  getRemove<returnType>(
    id: number | null,
    route: string,
    qp: QueryParams = {},
    method: 'get' | 'delete' = 'get'
  ): Observable<returnType> {
    const cfqu = this.correctFormatForQueryUrl(qp);
    return this.http[method](
      `${this.END_POINT}/${route}${id ? '/' + id : ''}${cfqu}`
    ) as Observable<returnType>;
  }

  /**
   * this method will patch or post to any route
   * you choose
   */
  postPatch<returnType>(
    route: string,
    data: any,
    id: number = null,
    method: 'post' | 'patch' = 'post',
    qp: QueryParams = {}
  ): Observable<returnType> {
    const cfqu = this.correctFormatForQueryUrl(qp);
    return this.http[method](
      `${this.END_POINT}/${route}${id ? '/' + id : ''}${cfqu}`,
      data
    ) as Observable<returnType>;
  }

  /**
   * In the return we will attach the '?' if the user provides a query params
   * and if the user provides a null we do not need to map the array to
   * anything, we just simply returns ''.
   * if there qp dose has some keys an values
   * e.g
   * const z = {userId: 1, name: 'rowad'} then
   * this method will return ["userId=1", "name=rowad"]
   */
  private correctFormatForQueryUrl(qp: QueryParams): string {
    if (isNull(qp)) {
      return '';
    }
    const qpAsStr = this.mapQueryParamsToUrl(qp);
    return qpAsStr.length === 0 ? '' : `?${qpAsStr.join('&')}`;
  }

  /**
   * e.g :
   * const z = {userId: 1, name: 'rowad'} then
   * this method will return ["userId=1", "name=rowad"]
   */
  private mapQueryParamsToUrl(qp: QueryParams): Array<string> {
    return Object.keys(qp).map((key: string) => {
      return `${key}=${qp[key]}`;
    });
  }
}
