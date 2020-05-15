import { Injectable } from '@angular/core';
import {DetalleProcesoedd } from '../models/detalle-proceso-edd';
import { DetalleProcesoEddua } from '../models/detalle-proceso-edd-ua';
import { DETALLEPROCESOEDDUA } from '../mocks/mock-detalle-edd-ua';



@Injectable({
  providedIn: 'root'
})
export class DetalleEdduaService {

  constructor() { }

  DetalleProcesoEddua(): DetalleProcesoEddua[] {
    return DETALLEPROCESOEDDUA;
  }


}
