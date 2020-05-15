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
import { DetalleProcesoEddua } from 'src/app/models/detalle-proceso-edd-ua';
import { DetalleEdduaService } from 'src/app/services/detalle-edd-ua.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-detalle-edd-ua',
  templateUrl: './detalle-edd-ua.component.html',
  styleUrls: ['./detalle-edd-ua.component.css']
})
export class DetalleEddUaComponent implements OnInit {

   //Variables Globales de la clase
   movimidetalleproua: DetalleProcesoEddua[];
   map = new Map<String, String>();
   cols: any[];
   @ViewChild('dt') table: Table;
   items: MenuItem[];
   displayDialog: boolean;
   idservpublico: string;
   idServidorPublico: string = '';
   nombreServidorPublico: string = '';
   descnotifica: string;
   index: number = 0;
   idcancelar: string;
 
 
   
 
 //Constructor de la clase
   constructor(
     private utilsService: UtilsService,
     private service: DetalleEdduaService,
     private route: ActivatedRoute,
     private router: Router,
     private messageService: MessageService,
     private authenticationService: AuthenticationServiceService,
     private logger: NGXLogger,
     private spinner: NgxSpinnerService,
     private confirmationService: ConfirmationService,
     private fb: FormBuilder) { }
 
 
 //Metodo principal de la clase
   ngOnInit(): void {
 
 
     if (this.authenticationService.currentUserValue) {
       this.logger.debug('Usuario logueado en Home');
       this.authenticationService.currentUser.subscribe(usr => {
         console.log(usr);
         this.idServidorPublico = usr.CLAVESERVIDOR;
         this.nombreServidorPublico= usr.NOMBRECOMPLETO;
       });
     }
 
     //Obtiene notificaciones en base al idServidorPublico
     this.obtenerNotificaciones();
 
     let fecha = moment(new Date()).format('MMMM Do YYYY');
         
 
   
 
      /*Informacion del grid*/
      this.movimidetalleproua = this.service.DetalleProcesoEddua();;
 
   }
 
 
 
 
 /**********************Notificaciones Etiquetas***************************************/
 
 //Metodo Obtener notificaciones
 obtenerNotificaciones() {
   console.log('Dentro2 de obtenerNotificaciones');
   
   
   this.utilsService.obtenerNotificaciones(this.idServidorPublico).subscribe(data => {
     
     //console.log(data);
 
     
     data.forEach(obj => {
 
       this.descnotifica = obj[0];
       this.idcancelar = obj[1];
 
       //console.log("Descripcion " + this.descnotifica);
       //console.log("Id cancelar " + this.idcancelar);
       //console.log("Valor de index111 " + this.index);
 
       if(this.index <= 4 ){
           this.index++;
           //console.log("Valor de index222 " + this.index);
           this.messageService.add({key:'notifi', severity:'warn', summary: 
           'Tienes Notificaciones Por Revisar', detail: this.descnotifica});
          
           /*Cancelando Notificaciones*/
           this.utilsService.cancelarNotificaciones(this.idcancelar).subscribe();
       }
 
       console.log('-------------------');
       
   });
 
   });
 
   console.log('Saliendo2 de obtenerNotificaciones');
   
 
 }
 
 
 
   confirmacionEvaluacionDesempeno() {
     console.log('ss');
     this.messageService.clear();
     this.messageService.add({ key: 'c', sticky: true, severity: 'warn', summary: '¿Estás seguro?', detail: 'Confirmar para continuar' });
   }
 
 
   rechazar() {
     this.messageService.clear('c');
   }
 
   no(){
     this.displayDialog=false;
   }

   showRegresar() {
    this.router.navigate(['/detalleEdd']);
  }


  redirectEjecucionEddambos() {
    this.router.navigate(['/ejecucionEddambos']);
   }
 
 }
 
  
