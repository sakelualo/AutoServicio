import { Injectable } from '@angular/core';
import { DatosProfesionales } from '../models/datos-profesionales';
import { RespuestaApi } from '../repuesta/respuesta-api';
import { environment } from 'src/environments/environment';
import { EnvioParametros } from '../models/envio-parametros';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatosProfesionalesDTO } from '../dto/datosProfesionalesDTO';
import * as moment from 'moment';
import { EmisorCertificado } from '../models/emisor-certificado';
@Injectable({
  providedIn: 'root'
})
export class DatosprofesionalesService {


  constructor(private http: HttpClient) { }


  obtenerDatosProfesionales(idEmpleado: string) {

    let data = {
      "funcion": "consultarDatosProfesionales",
      "IDSERVIDORPUBLICO": idEmpleado
    };
    let body = JSON.stringify({ request: data });
    return this.http.post<RespuestaApi<DatosProfesionales>>(`${environment.HOST}/frwsr_LPSAUT_CONS.php`, body, { headers: this.agregarAuthorizationHeader() });
  }


  eliminarDatosProfesionales(idEmpleado: string, idDatoProfesional: string) {

    let data = {
      "funcion": "eliminarDatosProfesionales",
      "IDSERVIDORPUBLICO": idEmpleado,
      "IDREGISTRODATOPROFESIONAL": idDatoProfesional
    };
    let body = JSON.stringify({ request: data });
    return this.http.post<RespuestaApi<DatosProfesionales>>(`${environment.HOST}/frwsr_LPSAUT_SERV.php`, body, { headers: this.agregarAuthorizationHeader() });
  }



  insertarActualizarDatosProfesionales(idEmpleado: string,
    idDatoProfesional: string, datosProfesionalesDTO: DatosProfesionalesDTO) {
      
      datosProfesionalesDTO.fechaEmisionCertificado = moment(datosProfesionalesDTO.fechaEmisionCertificado).format('YYYY-MM-DD HH:mm:ss');

    let data = {
      "funcion": "gestionarDatosProfesionales",
      "IDDATOPROFESIONAL": idDatoProfesional,
      "IDSERVIDORPUBLICO": idEmpleado,
      "IDNIVELESTUDIOS": datosProfesionalesDTO.idNivelEstudios,
      "FECHAEMISIONCERTIFICADO": datosProfesionalesDTO.fechaEmisionCertificado,
      "FECHAVIGENCIACERTIFICADO": datosProfesionalesDTO.fechaVigenciaCertificado,
      "NOMBRECERTIFICADO": datosProfesionalesDTO.nombreCertificado,
      "IDTIPOCERTIFICADO": datosProfesionalesDTO.idTipoCertificado,
      "NOCERTIFICADO": datosProfesionalesDTO.noCertificado,
      "IDEMISORCERTIFICADO": datosProfesionalesDTO.idEmisor
    };

    let body = JSON.stringify({ request: data });
    return this.http.post<RespuestaApi<DatosProfesionales>>(`${environment.HOST}/frwsr_LPSAUT_SERV.php`, body, { headers: this.agregarAuthorizationHeader() });
      
  }


  obtenerEmisorCertificado() {

    let data = {
      "funcion": "consultarCatalogoEmisoresCertificado"
    };
    let body = JSON.stringify({ request: data });
    return this.http.post<RespuestaApi<EmisorCertificado>>
      (`${environment.HOST}/frwsr_LPSAUT_CONS.php`, body, { headers: this.agregarAuthorizationHeader() });
      
  }

  public envioParametros(funcion: string, idEmpleado: string) {
    return new EnvioParametros(funcion, idEmpleado);
  }

  public agregarAuthorizationHeader() {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(environment.TOKEN_AUTH_USERNAME + ':' + environment.TOKEN_AUTH_PASSWORD)
    });
    return httpHeaders;
  }



}
