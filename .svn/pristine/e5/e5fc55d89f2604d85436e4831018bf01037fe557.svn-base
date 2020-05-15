import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SolicitudConstancia } from '../modules/solicitud_constancia/solicitud-constancia';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SolicitudconstanciaService {

  
  //url: string = "http://localhost:8085/solicitudConstancia";

  constructor(private http: HttpClient) { }

  registrar(solicitudConstancia: SolicitudConstancia) {
    return this.http.post(environment.BASEENPOINT_SOLICITUD_CONSTANCIA,solicitudConstancia);
  }
}
