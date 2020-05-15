import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Menu } from '../models/menu';
import { Parametros } from '../models/parametros';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AutoservicioService {
  //private baseEndpoint = 'http://localhost:8090/api/autoservicio';
  constructor(private http: HttpClient) { }
  public listarMenu(): Observable<Menu[]> {
    return this.http.get<Menu[]>(environment.BASEENPOINT_AUTOSERVICIO);
  }
  public listarMenuByRol(idRol: number): Observable<Menu[]> {
    return this.http.get<Menu[]>(`${environment.BASEENPOINT_AUTOSERVICIO}/${idRol}`);
  }
  public parametroByClave(clave: String): Observable<Parametros> {
    return this.http.get<Parametros>(`${environment.BASEENPOINT_AUTOSERVICIO}/claveParametro/${clave}`)
  }
}
