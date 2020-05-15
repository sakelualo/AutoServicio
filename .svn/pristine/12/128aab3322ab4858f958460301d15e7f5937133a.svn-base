import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EncriptdecriptService {
  //private baseEndpoint = 'http://localhost:8090/api/encriptdecript';
  private password: String = 's3IFsvpuMVrxIfIQENJ5';
  private algoritmo: String = 'AES';


  constructor(private http: HttpClient) { }
  /**
   * desencripta con algoritmo AES
   * @param clave  String encriptado 
   */
  public decriptCSP(clave: String): Observable<any> {
    return this.http.get<any>(`${environment.BASEENPOINT_ENCRIPTDECRIPT}/contenidodesencriptar/${clave}/password/${this.password}/algoritmo/${this.algoritmo}`);
  }

}
