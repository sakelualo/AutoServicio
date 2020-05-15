import { Component, OnInit } from '@angular/core';
import { ArchivosNomina } from 'src/app/models/archivos-nomina';
import { RecibosNominaService } from 'src/app/services/recibos-nomina.service';
import { AuthenticationServiceService } from 'src/app/services/authentication-service.service';
import { NGXLogger } from 'ngx-logger';
import { DatosPersonales } from 'src/app/models/datos-personales';
import { BusgenericserviceService } from 'src/app/services/busgenericservice.service';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";
import { FormGroup, FormBuilder } from '@angular/forms';
import { UtilsService } from 'src/app/services/utils.service';
import * as moment from 'moment';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';


@Component({
  selector: 'app-recibos-nomina',
  templateUrl: './recibos-nomina.component.html',
  styleUrls: ['./recibos-nomina.component.css'],
  providers: [DatePipe]
})
export class RecibosNominaComponent implements OnInit {

  //Variables Globales de la clase
  archivos: ArchivosNomina[];
  currentUser: DatosPersonales = new DatosPersonales();
  maxDate: Date;
  fechaInicio: Date;
  fechaFin: Date;
  es: any;
  theFormGroup: FormGroup;
  ttlrecibosnomina: string;
  lbltooltipfechas: string;
  lblfiltrofechas: string;
  lblfechainicio: string;
  lblfechafin: string;
  lblfecha: string;
  btnbuscar: string;
  lblperiodo: string;
  lblnombre: string;
  rangoAnios: string;
  idServidorPublico: string = '';
  nombreServidorPublico: string = '';
  descnotifica: string;
  index: number = 0;
  idcancelar: string;


  //Constructor de la clase
  constructor(private service: RecibosNominaService,
    private authenticationService: AuthenticationServiceService,
    private logger: NGXLogger,
    private servicegeneric: BusgenericserviceService,
    private datePipe: DatePipe,
    private spinner: NgxSpinnerService,
    private builder: FormBuilder,
    private messageService: MessageService,
    private utilsService: UtilsService) {
    this.maxDate = new Date();
    this.theFormGroup = this.builder.group({
      startDate: ["", []],
      endDate: ["", []]
    });
    this.obtenerEtiquetasRecibosNomina();
  }


  //Metodo principal de la clase
  ngOnInit(): void {
    let anio = moment(new Date()).format("YYYY");
    this.rangoAnios = '1995:' + anio;
    this.iniciaCalendario();
    //validación de usuario en sesión 
    if (this.authenticationService.currentUserValue) {
      this.logger.debug('Usuario logueado en Home');
      this.authenticationService.currentUser.subscribe(usr => {
        this.currentUser = usr;
        this.idServidorPublico = usr.CLAVESERVIDOR;
        this.nombreServidorPublico= usr.NOMBRECOMPLETO;
      });
    } else {
      this.logger.debug('Usuario no logueado en Home');


    }

    //Obtiene notificaciones en base al idServidorPublico
    this.obtenerNotificaciones();


  }
  /**
   * Obtiene los recibos de nomina del servidor logueado
   */
  obtenerRecibosNomina() {

    this.spinner.show();
    let converFechaInicio = this.fechaInicio === undefined ? '' : this.datePipe.transform(this.fechaInicio, 'yyyy-MM-dd hh:mm:ss');
    let converFechaFin = this.fechaFin === undefined ? '' : this.datePipe.transform(this.fechaFin, 'yyyy-MM-dd hh:mm:ss');
    this.logger.debug('Fecha: ', converFechaInicio);
    this.logger.debug('Fecha: ', converFechaFin);
    this.logger.debug('frwsr_LPSAUT_CONS.php', { request: { funcion: 'consultarRecibosNomina', IDSERVIDORPUBLICO: this.currentUser.CLAVESERVIDOR, FECHAINICIO: converFechaInicio, FECHAFIN: converFechaFin } });
    this.servicegeneric.postPatch<Array<ArchivosNomina>>('frwsr_LPSAUT_CONS.php', { request: { funcion: 'consultarRecibosNomina', IDSERVIDORPUBLICO: this.currentUser.CLAVESERVIDOR, FECHAINICIO: converFechaInicio, FECHAFIN: converFechaFin } })
      .subscribe({
        next: (recibos: Array<ArchivosNomina>) => {
          let jsonObj: any[] = this.servicegeneric.getResponseJSONObject(recibos);
          this.archivos = <ArchivosNomina[]>jsonObj;
          this.spinner.hide();
        },
        error: this.logger.error
      });

  }

  iniciaCalendario() {
    this.es = {
      firstDayOfWeek: 1,
      dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
      dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
      dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
      monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
      monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
      today: 'Hoy',
      clear: 'Borrar'
    }
  }

  /**
 * Obtiene las etiquetas de la pantalla
 */
  obtenerEtiquetasRecibosNomina() {

    const usuario = this.utilsService.ObtenerEtiquetasPagina('/recibosNomina', 'español (México)').subscribe(data => {
      this.logger.debug(data);
      Object.keys(data).map((key) => {
        if (key === 'ttl.recibosnomina') {
          this.ttlrecibosnomina = data[key];
        }
        if (key === 'lbl.tooltipfechas') {
          this.lbltooltipfechas = data[key];
        }
        if (key === 'lbl.filtrofechas') {
          this.lblfiltrofechas = data[key];
        }
        if (key === 'lbl.fechainicio') {
          this.lblfechainicio = data[key];
        }
        if (key === 'lbl.fechafin') {
          this.lblfechafin = data[key];
        }
        if (key === 'lbl.fecha') {
          this.lblfecha = data[key];
        }
        if (key === 'btn.buscar') {
          this.btnbuscar = data[key];
        }
        if (key === 'lbl.periodo') {
          this.lblperiodo = data[key];
        }
        if (key === 'lbl.nombre') {
          this.lblnombre = data[key];
        }

      });
    });


  }


  rechazar() {
    this.messageService.clear('c');
  }


/**********************Notificaciones Etiquetas************************************** */
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
