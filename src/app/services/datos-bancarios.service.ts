import { Injectable } from '@angular/core';
import { DATOSBANCARIOSMOCK } from '../mocks/mock-datosbancarios';
import { DatosBancarios } from '../models/datos-bancarios';
import { Bancos } from '../models/bancos';
import { BANCOSMOCKS } from '../mocks/mock-bancos';

@Injectable({
  providedIn: 'root'
})
export class DatosBancariosService {

  constructor() { }

  getDatosBancarios(): DatosBancarios[] {
    return DATOSBANCARIOSMOCK;
  }

  getBancos(): Bancos[] {
    return BANCOSMOCKS;
  }
}
