import { Injectable } from '@angular/core';
import { ArchivosNomina } from '../models/archivos-nomina';
import { ARCHIVOSNOMINA } from '../mocks/mock-archivosNomina';

@Injectable({
  providedIn: 'root'
})
export class RecibosNominaService {

  constructor() { }

  getRecibosNomina (): ArchivosNomina[]{
    return ARCHIVOSNOMINA;
  }
}
