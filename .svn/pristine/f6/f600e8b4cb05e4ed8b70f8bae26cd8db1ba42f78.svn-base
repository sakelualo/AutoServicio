import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bitacora } from '../models/bitacora';
import { Modulo } from '../models/modulo';
import { TipoRegistro } from '../models/tipo-registro';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BitacoraService {

  url: string = `${environment.BASEENPOINT_BITACORA}`;

  constructor(private http: HttpClient) { }

  registrar(idServidorPublico:string, idModulo: number, idTipoRegistro:number) {
    return this.http.post(this.url, this.guardaBitacora(idServidorPublico, idModulo, idTipoRegistro));
  }

  guardaBitacora(idServidorPublico:string, idModulo: number, idTipoRegistro:number){

    let bitacora = new Bitacora();
    bitacora.idServidorPublico=idServidorPublico;
    let modulo = new Modulo();
    modulo.idModulo=idModulo;
    let tipoRegistro = new TipoRegistro();
    tipoRegistro.idTipoRegistro=idTipoRegistro;
    bitacora.modulo= modulo;
    bitacora.tipoRegistro= tipoRegistro;
    bitacora.descripcion= "Se registro una operacion :"+ 
                            idTipoRegistro+" en el modulo : " +idModulo +" del  servidor público :"+ 
                            idServidorPublico ;
    return bitacora;
  }


}
