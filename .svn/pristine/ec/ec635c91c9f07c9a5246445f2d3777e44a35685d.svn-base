import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConsultaEventos } from '../models/consulta-eventos';
import { ConsultaCategorias } from '../models/consulta-categorias';
import { CarouselInformativo } from '../models/carousel-informativo';
import { CATEGORIASMOCK } from '../mocks/mock-categorias';
import { EVENTOSMOCK } from '../mocks/mock-eventos';



@Injectable({
  providedIn: 'root'
})
export class CarouselInformativoServiceService {
  private baseEndpoint = 'https://desabus.edomex.gob.mx/bussrv/sei/frwsr_LPSAUT_CONS_CAT.php?';

  constructor(private http: HttpClient) { }

  public listarCategorias(idCategoria: String): Observable<ConsultaCategorias[]> {
    const funcion = "CONSULTACATEGORIAS";
    const headers = { 'Authorization': 'seiusr my-aguacate' }
    console.log(`${this.baseEndpoint}/${funcion}/${idCategoria}`);
    return this.http.get<ConsultaCategorias[]>(`${this.baseEndpoint}funcion=CONSULTACATEGORIAS&IDCATEGORIA`, { headers });
  }

  public listarEventosByCategoria(idCategoria: String): Observable<ConsultaEventos[]> {
    return this.http.get<ConsultaEventos[]>(`${this.baseEndpoint}/${idCategoria}`)
  }

  getCategorias(): ConsultaCategorias[] {
    return CATEGORIASMOCK;
  }

  getEventos(): ConsultaEventos[] {
    return EVENTOSMOCK;
  }

}
