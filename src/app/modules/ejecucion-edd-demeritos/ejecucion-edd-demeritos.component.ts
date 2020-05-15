import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table/table';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { UtilsService } from 'src/app/services/utils.service';
import { AuthenticationServiceService } from 'src/app/services/authentication-service.service';
import { NGXLogger } from 'ngx-logger';
import * as moment from 'moment';
import { switchMap } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { Evaluaciondesempeno } from 'src/app/models/evaluaciondesempeno';
import { EvaluaciondesemService } from 'src/app/services/evaluaciondesempeno.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { DetalleEjecucionEddambos } from 'src/app/models/detalle-ejecucion-edd-ambos';
import { EjecucionEddambosService } from 'src/app/services/ejecucioneddambos.service';

@Component({
  selector: 'app-ejecucion-edd-demeritos',
  templateUrl: './ejecucion-edd-demeritos.component.html',
  styleUrls: ['./ejecucion-edd-demeritos.component.css']
})
export class EjecucionEddDemeritosComponent implements OnInit {

 //Variables Globales de la clase
 items3: MenuItem[];
 activeItem: MenuItem;
 preguntas: DetalleEjecucionEddambos[];
 activeIndex: number = 1;
 selectedValue: string;
 val1: string;

 //Constructor de la clase
 constructor(
   private utilsService: UtilsService,
   private route: ActivatedRoute,
   private router: Router,
   private service: EjecucionEddambosService,
   private messageService: MessageService,
   private authenticationService: AuthenticationServiceService,
   private logger: NGXLogger,
   private spinner: NgxSpinnerService,
   private confirmationService: ConfirmationService,
   private fb: FormBuilder
   ) { 

 }



 //Metodo principal de la clase
 ngOnInit(): void {

   this.items3 = [
     {label: 'Sección 1 \n Competencias Aptitudinales', icon: 'pi pi-list', routerLink:'/ejecucionEddambos'},
     {label: 'Sección 2 \n Competencias Sociopersonales', icon: 'pi pi-list', routerLink:'/ejecucionEdddesempeno'},
     {label: 'Sección 3 \n Deméritos', icon: 'pi pi-list', routerLink:'/ejecucionEdddemeritos'}
   ];


    /*Obteniendo las preguntas*/
    this.preguntas = this.service.getPreguntasEjecucionEddambos();

  



 }



 redirectReporteEddFinalizado() {
   this.router.navigate(['/reporteEddfinalizado']);
  }
   
  showRegresar() {
   this.router.navigate(['/ejecucionEdddesempeno']);
 }


}
