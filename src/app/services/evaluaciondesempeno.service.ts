import { Injectable } from '@angular/core';
import { Evaluaciondesempeno } from '../models/evaluaciondesempeno';
import { MOVIMIENTOSEVALUCIONDESEM } from '../mocks/mock-evaluaciondesempeno';

@Injectable({
  providedIn: 'root'
})
export class EvaluaciondesemService {

  constructor() { }

  getMovimientosEvaliciondesem(): Evaluaciondesempeno[] {
    return MOVIMIENTOSEVALUCIONDESEM;
  }
}
