import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CatalogoEstados } from '../models/catalogo-estados';
import { DatosPersonalesDTO } from '../dto/datosPersonalesDTO';
import { RespuestaApi } from '../repuesta/respuesta-api';
import { ConsultaDatosCorreo } from '../models/consulta-datos-correo';
import { ConsultaDatosDireccion } from '../models/consulta-datos-direccion';
import { ConsultaDatosTelefonicos } from '../models/consulta-datos-telefonicos';
import { ConsultaDatosPersonales } from '../models/consulta-datos-personales';
import { ConsultaDatosServidorPublico } from '../models/consulta-datos-servidor-publico';



@Injectable({
  providedIn: 'root'
})
export class DatospersonalesService {
  urlCat: string = `${environment.HOST}/frwsr_LPSAUT_CONS_CAT.php`;
  urlDat: string = `${environment.HOST}/frwsr_LPSAUT_CONS_DAT.php`;
  urlServ: string = `${environment.HOST}/frwsr_LPSAUT_SERV.php`;
  //url: string = "http://localhost:8085/datosPersonales";
  estados:CatalogoEstados[];

  constructor(private http: HttpClient) { }


  registrar(datosPersonalesDTO: DatosPersonalesDTO) {
    console.log(datosPersonalesDTO);
    return this.http.post(environment.BASEENPOINT_DATOS_PERSONALES, datosPersonalesDTO);
  }

  cargaDatosPersonales(idEmpleado : string,
    nombre: string, apellidoPaterno: string, apellidoMaterno:string ) {
    let data = {
      "funcion": "CONSULTADATOSPERSONALES",
      "IDEMPLEADO": idEmpleado,
      "NOMBRE": nombre,
      "APELLIDOPAT": apellidoPaterno,
      "APELLIDOMAT": apellidoMaterno
    };
    let body = JSON.stringify({ request: data });
    return this.http.post<RespuestaApi<ConsultaDatosPersonales>>(`${this.urlDat}`, body, { headers: this.agregarAuthorizationHeader() })
    .pipe(
      catchError(e => {
        if (e.status == 400) {
          return throwError(e);
        }
        console.error(e)
        return throwError(e);
      })
    );;

  }




  cargaDatosDireccion(idEmpleado : string) {
    let data = {
      "funcion": "CONSULTADATOSDIRECCION",
      "IDEMPLEADO": idEmpleado
    };
    let body = JSON.stringify({ request: data });
    return this.http.post<RespuestaApi<ConsultaDatosDireccion>>(`${this.urlDat}`, body, { headers: this.agregarAuthorizationHeader() })
    .pipe(
      catchError(e => {
        if (e.status == 400) {
          return throwError(e);
        }
        console.error(e)
        return throwError(e);
      })
    );;

  }

  cargaDatosCorreo(idEmpleado : string) {
    let data = {
      "funcion": "CONSULTADATOSCORREO",
      "IDEMPLEADO": idEmpleado
    };
    let body = JSON.stringify({ request: data });
    return this.http.post<RespuestaApi<ConsultaDatosCorreo>>(`${this.urlDat}`, body, { headers: this.agregarAuthorizationHeader() })
    .pipe(
      catchError(e => {
        if (e.status == 400) {
          return throwError(e);
        }
        console.error(e)
        return throwError(e);
      })
    );;

  }
  cargaDatosTelefonicos(idEmpleado : string) {
    let data = {
      "funcion": "CONSULTADATOSTELEFONICOS",
      "IDEMPLEADO": idEmpleado
    };
    let body = JSON.stringify({ request: data });
    return this.http.post<RespuestaApi<ConsultaDatosTelefonicos>>(`${this.urlDat}`, body, { headers: this.agregarAuthorizationHeader() })
    .pipe(
      catchError(e => {
        if (e.status == 400) {
          return throwError(e);
        }
        console.error(e)
        return throwError(e);
      })
    );;

  }

  cargaEstados() {
    let data = {
      "funcion": "CONSULTACATESTADO",
      "IDPAIS": "MEX",
      "IDPESTADO": ""
    };
    let body = JSON.stringify({ request: data });
    return this.http.post<RespuestaApi<CatalogoEstados>>(`${this.urlCat}`, body, { headers: this.agregarAuthorizationHeader() })
    .pipe(
      catchError(e => {
        if (e.status == 400) {
          return throwError(e);
        }
        console.error(e)
        return throwError(e);
      })
    );;

  }

  actualizarDatosPersonales(idEmpleado : string,datosPersonalesDTO:DatosPersonalesDTO ) {
    let data = {
      "funcion": "actualizarDatosPersonales",
        "CLAVESERVIDORPUBLICO": idEmpleado,
        "IDDATOSPERSONALES": "1",
        "TELEFONO":datosPersonalesDTO.telefono,
        "CORREOELECTRONICO": datosPersonalesDTO.correoElectronico,
        "IDESTADO": datosPersonalesDTO.idEstado,
        "IDMUNICIPIO": datosPersonalesDTO.idMunicipio,
        "IDCOLONIA": datosPersonalesDTO.idColonia,
        "CALLE": datosPersonalesDTO.direcion,
        "NUMEXTERIOR": datosPersonalesDTO.numeroExterior,
        "NUMINTERIOR": datosPersonalesDTO.numeroInterior,
        "CODIGOPOSTAL": datosPersonalesDTO.codigoPostal
    };
    let body = JSON.stringify({ request: data });
    return this.http.post<RespuestaApi<ConsultaDatosPersonales>>(`${this.urlServ}`, body, { headers: this.agregarAuthorizationHeader() })
    .pipe(
      catchError(e => {
        if (e.status == 400) {
          return throwError(e);
        }
        console.error(e)
        return throwError(e);
      })
    );;

  }

  cargaDatosServidorPublico(idEmpleado : string ) {
    let data = {
      "funcion": "consultarDatosServidorPublico",
      "IDSERVIDORPUBLICO": idEmpleado
    };
    let body = JSON.stringify({ request: data });
    return this.http.post<RespuestaApi<ConsultaDatosServidorPublico>>(`${environment.HOST}/frwsr_LPSAUT_CONS.php`, body, { headers: this.agregarAuthorizationHeader() });

  }

  public agregarAuthorizationHeader() {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(environment.TOKEN_AUTH_USERNAME + ':' + environment.TOKEN_AUTH_PASSWORD)
    });
    return httpHeaders;
  }


}