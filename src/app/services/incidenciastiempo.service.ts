import { Injectable } from '@angular/core';
import { IncidenciasTiempo } from '../models/incidencias-tiempo';
import { INCIDENCIASTIEMPO } from '../mocks/mock-indicencias-tiempo';
import { RespuestaApi } from '../repuesta/respuesta-api';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IncidenciastiempoService {

  url :string = '/frwsr_LPSAUT_CONS.php';
  maxDate: Date;
  constructor(private http: HttpClient) { }

  obteneterIncidenciasTiempo(idEmpleado:string, ) {
    let data = {
      "funcion": "consultarIncidenciasTiempo",
      "IDSERVIDORPUBLICO": idEmpleado
    };
    let body = JSON.stringify({ request: data });
    return this.http.post<RespuestaApi<IncidenciasTiempo>>(`${environment.HOST}${this.url}`, body, { headers: this.agregarAuthorizationHeader() })
      .pipe(
        catchError(e => {
          if (e.status == 400) {
            return throwError(e);
          }
          console.error(e)
          return throwError(e);
        })
      );
  }

  public agregarAuthorizationHeader() {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(environment.TOKEN_AUTH_USERNAME + ':' + environment.TOKEN_AUTH_PASSWORD)
    });
    return httpHeaders;
  }

}
