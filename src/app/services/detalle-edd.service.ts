import { Injectable } from '@angular/core';
import {DetalleProcesoedd } from '../models/detalle-proceso-edd';
import {DETALLEPROCESOEDD, DETALLECOMISIONESEDD } from '../mocks/mock-detalle-edd';
import { DetalleComisionesedd } from '../models/detalle-comisiones-edd';


@Injectable({
  providedIn: 'root'
})
export class DetalleeddService {

  constructor() { }

  DetalleProcesoedd(): DetalleProcesoedd[] {
    return DETALLEPROCESOEDD;
  }


  DetalleComisionedd(): DetalleComisionesedd[] {
    return DETALLECOMISIONESEDD;
  }

}
