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

@Component({
  selector: 'app-evaluacion-desempeno',
  templateUrl: './evaluacion-desempeno.component.html',
  styleUrls: ['./evaluacion-desempeno.component.css']
})
export class EvaluacionDesempenoComponent implements OnInit {



  //Variables Globales de la clase
  movimientos: Evaluaciondesempeno[];
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
    private service: EvaluaciondesemService,
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
        

   


    this.cols = [
      { field: 'PROCESOEVA', header: 'Proceso de Evaluación' },
      { field: 'FECHAINI', header: 'Fecha de Inicio'},
      { field: 'FECHAFIN', header: 'Fecha Fin' },
      { field: 'DESEMPENO', header: 'Desempeño' },
      { field: 'DEMERITOS', header: 'Deméritos' },
      { field: '', header: 'Detalle' }
    ];  

    /*Informacion del grid*/
     this.movimientos = this.service.getMovimientosEvaliciondesem();

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

  redirectDetalleedd() {
    this.router.navigate(['/detalleEdd']);
   }
    
   showRegresar() {
    this.router.navigate(['/home']);
  }

}
