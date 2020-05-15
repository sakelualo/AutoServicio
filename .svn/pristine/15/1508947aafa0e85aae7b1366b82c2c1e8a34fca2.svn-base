import { Injectable } from '@angular/core';
import { Pagos } from '../models/pagos';
import { PAGOSMOCK } from '../mocks/mock-pagos';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { RespuestaApi } from '../repuesta/respuesta-api';

@Injectable({
  providedIn: 'root'
})
export class PagosService {

  url :string = '/frwsr_LPSAUT_CONS.php';
  constructor(private http: HttpClient) { }

  getPagos(idEmpleado:string,fechaInicio:string, fechaFin) {
    let data = {
      "funcion": "consultarListadoPagos",
      "IDSERVIDORPUBLICO": idEmpleado,
      "FECHAINICIO":fechaInicio,
      "FECHAFIN": fechaFin
    };
    let body = JSON.stringify({ request: data });
    return this.http.post<RespuestaApi<Pagos>>(`${environment.HOST}${this.url}`, body, { headers: this.agregarAuthorizationHeader() })
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
