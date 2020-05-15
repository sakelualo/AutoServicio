import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table/table';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { ConstanciaHistorialLaboral } from 'src/app/models/constancia-historial-laboral';
import { HistoriallaboralService } from 'src/app/services/historiallaboral.service';
import { SolicitudConstancia } from '../solicitud_constancia/solicitud-constancia';
import { TipoConstancia } from '../solicitud_constancia/tipo-constancia';
import { CatEstatus } from '../solicitud_constancia/cat-estatus';
import { SolicitudconstanciaService } from 'src/app/services/solicitudconstancia.service';
import * as moment from 'moment';
import { AuthenticationServiceService } from 'src/app/services/authentication-service.service';
import { NGXLogger } from 'ngx-logger';
import { switchMap } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import { UtilsService } from 'src/app/services/utils.service';


@Component({
  selector: 'app-historial-laboral',
  templateUrl: './historial-laboral.component.html',
  styleUrls: ['./historial-laboral.component.css'],
  providers: [DatePipe]
})
export class HistorialLaboralComponent implements OnInit {

//Variables Globales de la clase
  displayDialog: boolean;
  cols: any[];
  @ViewChild('dt') table: Table;
  items: MenuItem[];
  constanciaHistorialForm: FormGroup;
  constanciaHistorialLaboral: ConstanciaHistorialLaboral[];
  idServidorPublico: string = '';
  nombreServidorPublico: string = '';
  descnotifica: string;
  index: number = 0;
  idcancelar: string;



  //Constructor de la clase
  constructor(private messageService: MessageService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private utilsService: UtilsService,
    private datePipe: DatePipe,
    private authenticationService: AuthenticationServiceService,
    private solicitudconstanciaService: SolicitudconstanciaService,
    private historialLaboralService: HistoriallaboralService,
    private logger: NGXLogger) { }

  //Metodo principal de la clase
  ngOnInit(): void {
    if (this.authenticationService.currentUserValue) {
      this.logger.debug('Usuario logueado en Home');
      this.authenticationService.currentUser.subscribe(usr => {
        console.log(usr);
        this.idServidorPublico = usr.CLAVESERVIDOR;
        this.nombreServidorPublico = usr.NOMBRECOMPLETO;
      });
    }

    //Obtiene notificaciones en base al idServidorPublico
    this.obtenerNotificaciones();

    this.cols = [
      { field: 'FECHASOLICITUD', header: 'Fecha' },
      { field: 'RESPUESTA', header: 'Gestor Administrativo' },
      { field: 'ESTATUS', header: 'Estatus' },
      { field: '', header: 'Archivo' }
    ];
    let fecha = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    this.constanciaHistorialForm = this.fb.group({
      'idServidorPublico': new FormControl(this.idServidorPublico),
      'nombreServidorPublico': new FormControl(this.nombreServidorPublico),
      'plaza': new FormControl('Toluca'),
      'fecha': new FormControl(fecha),
      'justificacion': new FormControl('', Validators.required)
    });
 


    this.obtenerHistorialLaboral();

  }

  obtenerHistorialLaboral() {
    this.spinner.show();
    this.historialLaboralService.obtenerHistoralLaboral(this.idServidorPublico)
      .subscribe((data) => {
        this.constanciaHistorialLaboral = data.response;
        this.spinner.hide();
      });
  }

  confirmacionConstanciaNoAdeudo() {
    console.log('ss');
    this.messageService.clear();
    this.messageService.add({ key: 'c', sticky: true, severity: 'warn', summary: '¿Estás seguro?', detail: 'Confirmar para continuar' });
  }

  showSaveDialog() {
    this.displayDialog = true;
    let fecha = moment(new Date()).locale('es').format('Do-MMMM-YYYY');

    
    this.constanciaHistorialForm = this.fb.group({
      'idServidorPublico': new FormControl(this.idServidorPublico),
      'nombreServidorPublico': new FormControl(this.nombreServidorPublico),
      'plaza': new FormControl('Toluca'),
      'fecha': new FormControl(fecha),
      'justificacion': new FormControl('', Validators.required)
    });
  }

  no() {
    this.displayDialog = false;

  }

  rechazar() {
    this.messageService.clear('c');
  }

  solicitarConstanciaHistorial() {
    this.spinner.show();
    this.historialLaboralService.
    insertaSolicituHistorialLaboral(this.idServidorPublico,this.constanciaHistorialForm.value['justificacion']).pipe(switchMap(() => {
        return     this.historialLaboralService.obtenerHistoralLaboral(this.idServidorPublico)
      })).subscribe(data => {
        this.constanciaHistorialLaboral = data.response;
        this.spinner.hide();
        this.messageService.clear('c');
        this.messageService.add({ key: 'd', severity: 'success', summary: "Resultado", detail: "La operación se realizó correctamente." });
        this.displayDialog = false;

      }, err =>{
        this.spinner.hide();
        this.messageService.add({ key: 'd', severity: 'error', summary: "Resultado", detail: "Ocurrio un error" });
      });


   /* this.historialLaboralService.consultaSolicitudHistorialLaboral(this.idServidorPublico, 1, 1).subscribe(data => {
      if (data.length > 0) {
        this.messageService.clear('c');
        this.messageService.add({ severity: 'error', summary: "Resultado", detail: "Ya has solicitado"
        +" una Constancia de Historal Laboral. Mantente al pendiente de la "+
        "respuesta del Gestor del Proceso Administrativo."
        });
        return;
      } else {


        this.historialLaboralService.
        insertaSolicituHistorialLaboral(this.idServidorPublico,this.constanciaHistorialForm.value['justificacion']).pipe(switchMap(() => {
            return     this.historialLaboralService.obtenerHistoralLaboral(this.idServidorPublico)
          })).subscribe(data => {
            this.constanciaHistorialLaboral = data.response;
    
            this.messageService.clear('c');
            this.messageService.add({ key: 'd', severity: 'success', summary: "Resultado", detail: "La operación se realizó correctamente." });
            this.displayDialog = false;
          }); 
    
        this.historialLaboralService.insertaSolicituHistorialLaboral(this.idServidorPublico,this.constanciaHistorialForm.value['justificacion']).subscribe(data => {
          console.log(data);
        });

        let solicitudConstancia = new SolicitudConstancia();



        solicitudConstancia.idServidorPublico = this.constanciaHistorialForm.value['idServidorPublico'];
        solicitudConstancia.justificacion = this.constanciaHistorialForm.value['justificacion'];
        let tipoConstancia = new TipoConstancia();
        tipoConstancia.idTipoConstancia = 1;
        solicitudConstancia.tipoConstancia = tipoConstancia;
        let catEstatus = new CatEstatus();
        catEstatus.idStatus = 1;
        solicitudConstancia.estatus = catEstatus;

        solicitudConstancia.idPlaza = 1;
        this.solicitudconstanciaService.registrar(solicitudConstancia).subscribe(() => {
          this.messageService.clear('c');
          this.messageService.add({ severity: 'success', summary: "Resultado", detail: "La operación se realizó correctamente." });
          this.displayDialog = false;
        }, err => {
          console.log('ocurrio un error');
          this.messageService.add({ severity: 'error', summary: "Resultado", detail: "Ocurrio un error al guardar en la bitacora" });

        });

      }

    });

*/


  }



//Metodo Obtener notificaciones
obtenerNotificaciones() {
  console.log('Dentro2 de obtenerNotificaciones');
  
  
  this.utilsService.obtenerNotificaciones(this.idServidorPublico).subscribe(data => {
    
    data.forEach(obj => {

      this.descnotifica = obj[0];
      this.idcancelar = obj[1];


      if(this.index <= 4 ){
          this.index++;
          
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



}
