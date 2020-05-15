import { TipoConstancia } from './tipo-constancia';
import { CatEstatus } from './cat-estatus';

export class SolicitudConstancia{

    idServidorPublico: number;
    tipoConstancia: TipoConstancia;
    estatus: CatEstatus;
    justificacion:string;
    idPlaza: number;
}