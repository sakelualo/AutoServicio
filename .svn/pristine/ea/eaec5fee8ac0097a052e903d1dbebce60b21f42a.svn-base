import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RespuestaApi } from '../repuesta/respuesta-api';
import { ConsultaDatosAcademicos } from '../models/consulta-datos-academicos';
import { EnvioParametros } from '../models/envio-parametros';
import { ConsultaEventos2 } from '../models/consulta-eventos2';
import { ConsultaDatosCetificado } from '../models/consulta-datos-certificado';
import { ConsultaCatalogoPais } from '../models/consulta-catalogo-pais';
import { ConsultaConocimientoIdioma } from '../models/consulta-conocimiento-idioma';
import { ConsultaCatGenero } from '../models/consulta-cat-genero';
import { ConsultaHistoricoComplementario } from '../models/consulta-historico-complementario';
import { ConsultaCatTratamiento } from '../models/consulta-cat-tratamiento';
import { ConsultaCatTipoCalle } from '../models/consulta-cat-tipo-calle';
import { EnvioCatalogos } from '../models/envio-catalogos';
import { ConsultaSectorPuesto } from '../models/consulta-sector-puesto';
import { ConsultaTTPlugDireccion } from '../models/consulta-ttplug-direccion';
import { ConsultaCatCenInformacion } from '../models/consulta-catcen-informacion';
import { ConsultaCatAreaPuesto } from '../models/consulta-cat-area-puesto';
import { ConsultaCatTituloCarrera } from '../models/consulta-cat-titulo-carrera';
import { ConsultaCatTipoVivienda } from '../models/consulta-cat-tipo-vivienda';
import { ConsultaCatTipoDiploma } from '../models/consulta-cat-tipo-diploma';
import { ConsultaCatMunicipio } from '../models/consulta-cat-municipio';
import { ConsultaCatTipoCertificado } from '../models/consulta-cat-tipo-certificado';
import { ConsultaCatColonia } from '../models/consulta-cat-colonia';
import { ConsultaCatEntidadEmisora } from '../models/consulta-cat-entidad-emisora';
import { ConsultaCatIdioma } from '../models/consulta-cat-idioma';
import { ConsultaCatTipoLugtelefono } from '../models/consulta-cat-tipo-lug-telefono';
import { ConsultaCatNivel } from '../models/consulta-cat-nivel';
import { ConsultaCatTipoLineaTelefonica } from '../models/consulta-cat-tipo-linea-telefonica';
import { ConsultaCatNivComporal } from '../models/consulta-cat-niv-comporal';
import { ConsultaCatNivScritura } from '../models/consulta-cat-nivs-escritura';
import { ConsultaDatosExperienciaProfesional } from '../models/consulta-datos-experiencia-profesional';
import { EstadoCivil } from '../models/estado-civil';

@Injectable({
  providedIn: 'root'
})
export class GeneralesService {

  urlCat: string = `/frwsr_LPSAUT_CONS_CAT.php`;
  urlCat2: string = `/frwsr_LPSAUT_CONS_CAT2.php`;
  urlDat2: string = `/frwsr_LPSAUT_CONS_DAT2.php`;
  urlCat3: string = `/frwsr_LPSAUT_CONS_CAT3.php`;
  urlCat4: string = `/frwsr_LPSAUT_CONS_CAT4.php`;
  urlCat5: string = `/frwsr_LPSAUT_CONS_CAT5.php`;

  urlDat6: string = `/frwsr_LPSAUT_CONS_DAT.php`;

  constructor(private http: HttpClient) { }

  cargaDatosAcademicos(idEmpleado: string) {

    let body = JSON.stringify({ request: this.envioParametros('CONSULTADATOSACADEMICOS', idEmpleado) });
    return this.http.post<RespuestaApi<ConsultaDatosAcademicos>>(`${environment.HOST}${this.urlDat2}`, body, { headers: this.agregarAuthorizationHeader() })
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

  consultaEventos(idEvento: string, idCategoria: string) {

    let data = {
      "funcion": "CONSULTAEVENTOS",
      "IDEVENTO": idEvento,
      "IDCATEGORIA": idCategoria
    };

    let body = JSON.stringify({ request: data });
    return this.http.post<RespuestaApi<ConsultaEventos2>>(`${environment.HOST}${this.urlCat}`, body, { headers: this.agregarAuthorizationHeader() })
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


  consultaDatosCertificadoLic(idEmpleado: string) {

    let body = JSON.stringify({ request: this.envioParametros('CONSULTADATOSCERTIFICADOLIC', idEmpleado) });
    return this.http.post<RespuestaApi<ConsultaDatosCetificado>>(`${environment.HOST}${this.urlDat2}`, body, { headers: this.agregarAuthorizationHeader() })
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


  consultaCatalogoPais(idPais: string) {

    let data = {
      "funcion": "CONSULTACATALOGOPAIS",
      "IDPAIS": idPais
    };

    let body = JSON.stringify({ request: data });
    return this.http.post<RespuestaApi<ConsultaCatalogoPais>>(`${environment.HOST}${this.urlCat}`, body, { headers: this.agregarAuthorizationHeader() })
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

  consultaDatosConocimientoIdiomas(idEmpleado: string) {

    let body = JSON.stringify({ request: this.envioParametros('CONSULTADATOCONOCIMIENTOIDIOMAS', idEmpleado) });
    return this.http.post<RespuestaApi<ConsultaConocimientoIdioma>>(`${environment.HOST}${this.urlDat2}`, body, { headers: this.agregarAuthorizationHeader() })
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

  consultaCatalogoGenero() {

    let data = {
      "funcion": "CONSULTACATGENERO"
    };

    let body = JSON.stringify({ request: data });
    return this.http.post<RespuestaApi<ConsultaCatGenero>>(`${environment.HOST}/frwsr_LPSAUT_CONS_CAT.php`, body, { headers: this.agregarAuthorizationHeader() });
  }

  consultaHistoricoComplementario(idEmpleado: string) {

    let body = JSON.stringify({ request: this.envioParametros('CONSULTADATOHISTCOMPLEMENTARIO', idEmpleado) });
    return this.http.post<RespuestaApi<ConsultaHistoricoComplementario>>(`${environment.HOST}${this.urlDat2}`, body, { headers: this.agregarAuthorizationHeader() })
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


  consultaCatalogoTratamiento() {

    let data = {
      "funcion": "CONSULTACATTRATAMIENTO"
    };

    let body = JSON.stringify({ request: data });
    return this.http.post<RespuestaApi<ConsultaCatTratamiento>>(`${environment.HOST}${this.urlCat3}`, body, { headers: this.agregarAuthorizationHeader() })
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

  consultaCatalogoTipoCalle() {

    let data = {
      "funcion": "CONSULTACATTIPOCALLE"
    };

    let body = JSON.stringify({ request: data });
    return this.http.post<RespuestaApi<ConsultaCatTipoCalle>>(`${environment.HOST}${this.urlCat}`, body, { headers: this.agregarAuthorizationHeader() })
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

  consultaSectorPuesto() {

    let body = JSON.stringify({ request: this.envioCatalogos('CONSULTACATSECTORPUESTO') });
    return this.http.post<RespuestaApi<ConsultaSectorPuesto>>(`${environment.HOST}${this.urlCat3}`, body, { headers: this.agregarAuthorizationHeader() })
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

  consultaTTPlugDireccion() {

    let body = JSON.stringify({ request: this.envioCatalogos('CONSULTACATTPLUGDIRECCION') });
    return this.http.post<RespuestaApi<ConsultaTTPlugDireccion>>(`${environment.HOST}${this.urlCat2}`, body, { headers: this.agregarAuthorizationHeader() })
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

  consultaCatalogoCenInformacion() {

    let data = {
      "funcion": "CONSULTACATCENFORMACION",
      "IDCENFORMA": "ITC"
    };

    let body = JSON.stringify({ request: data });
    return this.http.post<RespuestaApi<ConsultaCatCenInformacion>>(`${environment.HOST}${this.urlCat3}`, body, { headers: this.agregarAuthorizationHeader() })
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


  consultaCatAreaPuesto() {

    let body = JSON.stringify({ request: this.envioCatalogos('CONSULTACATAREAPUESTO') });
    return this.http.post<RespuestaApi<ConsultaCatAreaPuesto>>(`${environment.HOST}${this.urlCat3}`, body, { headers: this.agregarAuthorizationHeader() })
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

  consultaCatalogoTituloCarrera() {

    let data = {
      "funcion": "CONSULTACATTITULOCARRERA",
      "IDTICARRERA": ""
    };

    let body = JSON.stringify({ request: data });
    return this.http.post<RespuestaApi<ConsultaCatTituloCarrera>>(`${environment.HOST}${this.urlCat3}`, body, { headers: this.agregarAuthorizationHeader() })
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

  consultaCatalogoTipoVivienda() {

    let body = JSON.stringify({ request: this.envioCatalogos('CONSULTACATTPVIVIENDA') });
    return this.http.post<RespuestaApi<ConsultaCatTipoVivienda>>(`${environment.HOST}${this.urlCat2}`, body, { headers: this.agregarAuthorizationHeader() })
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

  consultaCatalogoTipoDiploma() {

    let body = JSON.stringify({ request: this.envioCatalogos('CONSULTACATTIPODIPLOMA') });
    return this.http.post<RespuestaApi<ConsultaCatTipoDiploma>>(`${environment.HOST}${this.urlCat4}`, body, { headers: this.agregarAuthorizationHeader() })
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

  consultaCatalogoMunicipio(idEstado:string) {

    let data = {
      "funcion": "CONSULTACATMUNICIPIO",
      "IDPAIS": "MEX",
      "IDPESTADO": idEstado,
      "IDMUNICIPIO": ""
    };

    let body = JSON.stringify({ request: data });
    return this.http.post<RespuestaApi<ConsultaCatMunicipio>>(`${environment.HOST}${this.urlCat2}`, body, { headers: this.agregarAuthorizationHeader() })
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

    consultaCatalogoTipoCertificado() {
    console.log(`${environment.HOST}${this.urlCat4}`);
    let body = JSON.stringify({ request: this.envioCatalogos('CONSULTACATTIPOCERTIFICADO') });
    return this.http.post<RespuestaApi<ConsultaCatTipoCertificado>>(`${environment.HOST}${this.urlCat4}`, body, { headers: this.agregarAuthorizationHeader() })
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

  consultaCatalogoColonias(idMunicipio:string) {

    let data = {
      "funcion": "CONSULTACATCOLONIAS",
      "IDPAIS": "MEX",
      "IDPESTADO": "MEX",
      "IDMUNICIPIO": idMunicipio,
      "IDCOLONIA": ""
    };

    let body = JSON.stringify({ request: data });
    return this.http.post<RespuestaApi<ConsultaCatColonia>>(`${environment.HOST}${this.urlCat2}`, body, { headers: this.agregarAuthorizationHeader() })
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

  consultaCatalogoEntidadEmisora() {

    let body = JSON.stringify({ request: this.envioCatalogos('CONSULTACATENTIDADEMI') });
    return this.http.post<RespuestaApi<ConsultaCatEntidadEmisora>>(`${environment.HOST}${this.urlCat4}`, body, { headers: this.agregarAuthorizationHeader() })
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

  consultaCatalogoIdiomas() {

    let data = {
      "funcion": "CONSULTACATIDIOMAS",
      "IDLENGUAJE": ""
    };

    let body = JSON.stringify({ request: data });
    return this.http.post<RespuestaApi<ConsultaCatIdioma>>(`${environment.HOST}${this.urlCat4}`, body, { headers: this.agregarAuthorizationHeader() })
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

   consultaCatTipoLugtelefono() {

    let body = JSON.stringify({ request: this.envioCatalogos('CONSULTACATTIPOLUGTELEFONO') });
    return this.http.post<RespuestaApi<ConsultaCatTipoLugtelefono>>(`${environment.HOST}${this.urlCat2}`, body, { headers: this.agregarAuthorizationHeader() })
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

  consultaCatNivelConver() {

    let data = {
      "funcion": "CONSULTACATNIVELCONVER",
      "IDLENGUAJE": ""
    };

    let body = JSON.stringify({ request: data });
    return this.http.post<RespuestaApi<ConsultaCatNivel>>(`${environment.HOST}${this.urlCat4}`, body, { headers: this.agregarAuthorizationHeader() })
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


  consultaCatTipoLineaTelefonica() {

    let body = JSON.stringify({ request: this.envioCatalogos('CONSULTACATTIPOLINEATELEFONICA') });
    return this.http.post<RespuestaApi<ConsultaCatTipoLineaTelefonica>>(`${environment.HOST}${this.urlCat3}`, body, { headers: this.agregarAuthorizationHeader() })
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

  

  consultaCatNivComporal() {

    let body = JSON.stringify({ request: this.envioCatalogos('CONSULTACATNIVCOMPORAL') });
    return this.http.post<RespuestaApi<ConsultaCatNivComporal>>(`${environment.HOST}${this.urlCat5}`, body, { headers: this.agregarAuthorizationHeader() })
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

  consultaCatNivScritura() {

    let body = JSON.stringify({ request: this.envioCatalogos('CONSULTACATNIVSCRITURA') });
    return this.http.post<RespuestaApi<ConsultaCatNivScritura>>(`${environment.HOST}${this.urlCat5}`, body, { headers: this.agregarAuthorizationHeader() })
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

  consultaDatosExperienciaProfesional(idEmpleado:string) {

    let body = JSON.stringify({ request: this.envioParametros('CONSULTADATOSEXPERIENCIAPRO', idEmpleado) });
  
    return this.http.post<RespuestaApi<ConsultaDatosExperienciaProfesional>>(`${environment.HOST}${this.urlDat6}`, body, { headers: this.agregarAuthorizationHeader() })
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

  consultaEstadoCivil() {

    let data = {
      "funcion": "CONSULTACATESTADOCIVIL"
    };

    let body = JSON.stringify({ request: data });
    return this.http.post<RespuestaApi<EstadoCivil>>(`${environment.HOST}/frwsr_LPSAUT_CONS_CAT2.php`, body, { headers: this.agregarAuthorizationHeader() });
  }

  public envioParametros(funcion: string, idEmpleado: string) {
    return new EnvioParametros(funcion, idEmpleado);
  }

  public envioCatalogos(funcion: string) {
    return new EnvioCatalogos(funcion);
  }
  public agregarAuthorizationHeader() {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(environment.TOKEN_AUTH_USERNAME + ':' + environment.TOKEN_AUTH_PASSWORD)
    });
    return httpHeaders;
  }
}
