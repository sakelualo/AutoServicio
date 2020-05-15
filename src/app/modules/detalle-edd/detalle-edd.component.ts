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
import { CatalogoNotificaciones } from 'src/app/models/notificaciones';
import { DetalleeddService } from 'src/app/services/detalle-edd.service';
import { DetalleProcesoedd } from 'src/app/models/detalle-proceso-edd';
import { DetalleComisionesedd } from 'src/app/models/detalle-comisiones-edd';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-detalle-edd',
  templateUrl: './detalle-edd.component.html',
  styleUrls: ['./detalle-edd.component.css']
})
export class DetalleEddComponent implements OnInit {


 //Variables Globales de la clase
 movimidetallepro: DetalleProcesoedd[];
 movimidetallecomi: DetalleComisionesedd[];
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
   private route: ActivatedRoute,
   private router: Router,
   private service: DetalleeddService,
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
       

    /*Informacion de los grids*/
    this.movimidetallepro = this.service.DetalleProcesoedd();
    this.movimidetallecomi = this.service.DetalleComisionedd();

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
   this.router.navigate(['/evaluacionDesempeno']);
 }

 redirectDetalleEddua(){
   this.router.navigate(['/detalleEddua']);
 }


}
