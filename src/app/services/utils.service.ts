import { Injectable } from '@angular/core';
import { ConstanciaAdeudo } from '../models/constancia-adeudo';
import { CONSTANCIAADEUDO } from '../mocks/mock-constancia-adeudo';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { RespuestaApi } from '../repuesta/respuesta-api';
import { throwError } from 'rxjs';
import { CatalogoNotificaciones } from '../models/notificaciones';
import { NGXLogger } from 'ngx-logger';

@Injectable({
  providedIn: 'root'
})


export class UtilsService {

  urlCat: string = `${environment.HOST}/frwsr_LPSAUT_CONS_CAT.php`;
  urlDat: string = `${environment.HOST}/frwsr_LPSAUT_CONS_DAT.php`;
  estados: CatalogoNotificaciones[];


  constructor(private http: HttpClient,
    private logger: NGXLogger
  ) { }




  ObtenerEtiquetasPagina(urlen: string, idioma: string) {
    this.logger.debug('servicio de obtener etiquetas')
    this.logger.debug(urlen);
    this.logger.debug(idioma)

    let data = {
      "url": urlen,
      "idioma": idioma
    };

    let body = JSON.stringify({ data });

    this.logger.debug('DATA' + data);
    this.logger.debug('BODY' + body);

    this.logger.debug(`${environment.BASEENPOINT_ETIQUETAS}`, data);

    return this.http.post<any>(`${environment.BASEENPOINT_ETIQUETAS}`, data)
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





  obtenerNotificaciones(cveservidor: string) {

    this.logger.debug('Dentro del MicroService UtilsService-obtenerNotificaciones');
    this.logger.debug(cveservidor);



    return this.http.post<CatalogoNotificaciones[]>(`${environment.BASEENPOINT_NOTIFICACIONES}`, cveservidor)
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



  cancelarNotificaciones(llnotifi: string) {

    this.logger.debug('Dentro del MicroService UtilsService-cancelarNotificaciones');
    this.logger.debug('Notificacion a Cancelar ' + llnotifi);

  
    return this.http.post(`${environment.BASEENPOINT_CANCELAR_NOTIFICACIONES}`, llnotifi)
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




  public agregarAuthorizationHeader() {

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return httpHeaders;


  }


}
