import { Injectable } from '@angular/core';
import { DetalleEjecucionEddambos } from '../models/detalle-ejecucion-edd-ambos';
import { DETALLEEJECUCIONEDDAMBOS } from '../mocks/mock-detalle-ejecucion-edd-ambos';

@Injectable({
  providedIn: 'root'
})
export class EjecucionEddambosService {

  constructor() { }
 
  getPreguntasEjecucionEddambos(): DetalleEjecucionEddambos[] {
    return DETALLEEJECUCIONEDDAMBOS;
  }
}
