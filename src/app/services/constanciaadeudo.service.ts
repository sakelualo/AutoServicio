import { Injectable } from '@angular/core';
import { ConstanciaAdeudo } from '../models/constancia-adeudo';
import { RespuestaApi } from '../repuesta/respuesta-api';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConstanciaadeudoService {

  constructor(   private http : HttpClient) { }

  obtenerConstanciaNoAdeudo(idEmpleado: string) {
    let data = {
      "funcion": "consultarHistoricoConstanciaNoAdeudo",
      "IDSERVIDORPUBLICO": idEmpleado
    };
    let body = JSON.stringify({ request: data });
    return this.http.post<RespuestaApi<ConstanciaAdeudo>>(`${environment.HOST}/frwsr_LPSAUT_CONS.php`, body, { headers: this.agregarAuthorizationHeader() });
  }


  insertaSolicitudConstanciaNoAdeudo(idEmpleado: string,
    justificacion: string) {
      

    let data = {
      "funcion": "solicitarConstanciaNoAdeudo",
      "IDSERVIDORPUBLICO": idEmpleado,
      "JUSTIFICACION": justificacion
    };

    let body = JSON.stringify({ request: data });
    console.log(body);
    return this.http.post<RespuestaApi<ConstanciaAdeudo>>(`${environment.HOST}/frwsr_LPSAUT_SERV.php`, body, { headers: this.agregarAuthorizationHeader() });
  }

  public agregarAuthorizationHeader() {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(environment.TOKEN_AUTH_USERNAME + ':' + environment.TOKEN_AUTH_PASSWORD)
    });
    return httpHeaders;
  }
}
