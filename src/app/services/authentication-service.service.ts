import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ConsultaDatosPersonales } from '../models/consulta-datos-personales';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { RespuestaApi } from '../repuesta/respuesta-api';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NGXLogger } from 'ngx-logger';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {
  private currentUserSubject: BehaviorSubject<ConsultaDatosPersonales>;
  public currentUser: Observable<ConsultaDatosPersonales>;
  private password: String = 's3IFsvpuMVrxIfIQENJ5';
  private algoritmo: String = 'AES';
  urlDat: string = `${environment.HOST}/frwsr_LPSAUT_CONS_DAT.php`;

  constructor(private http: HttpClient,
    private logger: NGXLogger
    ) {
    this.currentUserSubject = new BehaviorSubject<ConsultaDatosPersonales>(JSON.parse(sessionStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): ConsultaDatosPersonales {
    return this.currentUserSubject.value;
  }

  login(clave: String) {

    let idEmpleado: any;
    return this.http.get<any>(`${environment.BASEENPOINT_ENCRIPTDECRIPT}/contenidodesencriptar/${clave}/password/${this.password}/algoritmo/${this.algoritmo}`)
      .toPromise().then((res: any) => {
        console.log('valor de empleado>>' + res)
        idEmpleado = this.validUser(res);
        console.log('valor de empleado>>' + idEmpleado)
        return idEmpleado;
      });





  }

  private validUser(idEmpleado: String): any {

    let data = {
      "funcion": "CONSULTADATOSPERSONALES",
      "IDEMPLEADO": idEmpleado + '',
      "NOMBRE": '',
      "APELLIDOPAT": '',
      "APELLIDOMAT": ''
    };
    let body = JSON.stringify({ request: data });


    this.http.post<RespuestaApi<ConsultaDatosPersonales>>(`${this.urlDat}`, body, { headers: this.agregarAuthorizationHeader() })
      .toPromise().then((res: any) => {
        console.log('Servicio para datos personales ' + res.response);
        let usuario = <ConsultaDatosPersonales[]>res.response;
        console.log('Servicio para datos personales ' + usuario);
        let user: ConsultaDatosPersonales = usuario[0];
        console.log(user.CLAVESERVIDOR);
        //localStorage.setItem('currentUser', user.CLAVESERVIDOR);
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return res;
      });

  }


  logout() {
    this.logger.log('Cerrando sesion service');
    sessionStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }


  public agregarAuthorizationHeader() {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(environment.TOKEN_AUTH_USERNAME + ':' + environment.TOKEN_AUTH_PASSWORD)
    });
    return httpHeaders;
  }


}
