import { Injectable } from '@angular/core';
import { ConstanciaHistorialLaboral } from '../models/constancia-historial-laboral';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FuncionSolicitudCostanciaDTO } from '../dto/funcionSolicitudConstanciaDTO';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { RespuestaApi } from '../repuesta/respuesta-api';

@Injectable({
  providedIn: 'root'
})
export class HistoriallaboralService {

  urlDat6: string = `/frwsr_LPSAUT_CONS.php`;

  constructor(private http : HttpClient) { }


  obtenerHistoralLaboral(idEmpleado: string) {
    console.log(idEmpleado);
    let data = {
      "funcion": "cargarSolicitudesHistoricoLaboral",
      "IDSERVIDORPUBLICO": idEmpleado
    };
    let body = JSON.stringify({ request: data });
    return this.http.post<RespuestaApi<ConstanciaHistorialLaboral>>(`${environment.HOST}/frwsr_LPSAUT_CONS.php`, body, { headers: this.agregarAuthorizationHeader() })
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

  consultaSolicitudHistorialLaboral(idServidorPublico:string,
    idEstatus:number, idTipoSolicitud :number){
      return this.http.get<FuncionSolicitudCostanciaDTO[]>(`${environment.BASEENPOINT_AUTOSERVICIO}/solicitudConstancia/consultaSolicitudConstancia/${idServidorPublico}/${idEstatus}/${idTipoSolicitud}`);
  }


  insertaSolicituHistorialLaboral(idEmpleado: string,
    justificacion: string) {
      

    let data = {
      "funcion": "solicitarHistorialLaboral",
      "IDSERVIDORPUBLICO": idEmpleado,
      "JUSTIFICACION": justificacion
    };

    let body = JSON.stringify({ request: data });
    console.log(body);
    return this.http.post<RespuestaApi<ConstanciaHistorialLaboral>>(`${environment.HOST}/frwsr_LPSAUT_SERV.php`, body, { headers: this.agregarAuthorizationHeader() })
      .pipe(
        catchError(e => {
          console.error(e);
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
