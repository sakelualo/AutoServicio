import { Component, OnInit, ViewChild } from '@angular/core';
import { Movimientosfump } from 'src/app/models/movimientosfump';
import { MovimientosfumpService } from 'src/app/services/movimientosfump.service';
import { Table } from 'primeng/table/table';
import { NGXLogger } from 'ngx-logger';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar/calendar';
import { UtilsService } from 'src/app/services/utils.service';
import * as moment from 'moment';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { AuthenticationServiceService } from 'src/app/services/authentication-service.service';
import { BusgenericserviceService } from 'src/app/services/busgenericservice.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-movimientos-fump',
  templateUrl: './movimientos-fump.component.html',
  styleUrls: ['./movimientos-fump.component.css']
})

export class MovimientosFumpComponent implements OnInit {

  //Variables Globales de la clase
  movimientos: Movimientosfump[];
  @ViewChild('dt') table: Table;
  @ViewChild('endDate') calendarEndDate: any;
  maxDate: Date;
  es: any;
  fechaInicio: Date;
  fechaFin: Date;
  startmessageVisible: boolean;
  endmessageVisible: boolean;
  theFormGroup: FormGroup;
  ttltitulofump: string;
  lblfolio: string;
  lblfechamovimiento: string;
  lbltramite: string;
  lbltooltipfechas: string;
  lblfiltrofechas: string;
  lblfechainicio: string;
  lblfechafin: string;
  btnbuscar: string;
  rangoAnios: string;
  idServidorPublico: string = '';
  nombreServidorPublico: string = '';
  descnotifica: string;
  index: number = 0;
  idcancelar: string;


  //Constructor de la clase
  constructor(private service: MovimientosfumpService,
    private logger: NGXLogger,
    private builder: FormBuilder,
    private authenticationService: AuthenticationServiceService,
    private messageService: MessageService,
    private utilsService: UtilsService,
    private servicegeneric: BusgenericserviceService,
    private spinner: NgxSpinnerService) {
    this.maxDate = new Date();
    this.theFormGroup = this.builder.group({
      startDate: ["", []],
      endDate: ["", []]
    });
    this.obtenerEtiquetasFUMP();
  }


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

    let anio = moment(new Date()).format("YYYY");
    this.rangoAnios = '1995:' + anio;
    this.iniciaCalendario();
    //this.movimientos = this.service.getMovimientosFump();
    this. obtenerFUMPs();
     

  }
  /**
   * Inicia el calendario en español
   */
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
   * Captura los eventos del calendar
   * @param event 
   */
  public onChange(event: any): void {


  }
  /**
   * Valida que los campos no sean null
   */
  validateCalendar() {
    this.startmessageVisible = false;
    this.endmessageVisible = false;
    if (this.fechaInicio == undefined) {
      this.startmessageVisible = true;
    }
    if (this.fechaFin == undefined) {
      this.endmessageVisible = true;
    }
  }



  rechazar() {
    this.messageService.clear('c');
  }

  /**
 * Obtiene las etiquetas de la pantalla
 */
  obtenerEtiquetasFUMP() {

    const usuario = this.utilsService.ObtenerEtiquetasPagina('/movimientosFUMP', 'español (México)').subscribe(data => {
      Object.keys(data).map((key) => {

        if (key === 'ttl.titulofump') {
          this.ttltitulofump = data[key];
        }
        if (key === 'lbl.folio') {
          this.lblfolio = data[key];
        }
        if (key === 'lbl.fechamovimiento') {
          this.lblfechamovimiento = data[key];
        }
        if (key === 'lbl.tramite') {
          this.lbltramite = data[key];
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
        if (key === 'btn.buscar') {
          this.btnbuscar = data[key];
        }
        /*  if (key === '') {
           this. = data[key];
         } */
      });
    });


  }


  //Metodo Obtener notificaciones
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
  /**
   * Obtiene los moviemientos de FUMP que el usuario en sesion ha tenido
   */
  obtenerFUMPs() {
    this.spinner.show();
    this.servicegeneric.postPatch<Array<Movimientosfump>>('frwsr_LPSAUT_LFUMP.php', { request: { funcion: 'consultarListadoFUMP', idServidorPublico: this.idServidorPublico } })
      .subscribe({
        next: (recibos: Array<Movimientosfump>) => {
          let jsonObj: any[] = this.servicegeneric.getResponseJSONObject(recibos);
          this.movimientos = <Movimientosfump[]>jsonObj;
          this.spinner.hide();
        },
        error: this.logger.error
      });

  }


}
