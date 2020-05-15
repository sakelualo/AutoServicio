import { Component, OnInit, ViewChild } from '@angular/core';
import { IncidenciastiempoService } from 'src/app/services/incidenciastiempo.service';
import { IncidenciasTiempo } from 'src/app/models/incidencias-tiempo';
import { Table } from 'primeng/table/table';
import * as moment from 'moment';
import { AuthenticationServiceService } from 'src/app/services/authentication-service.service';
import { NGXLogger } from 'ngx-logger';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UtilsService } from 'src/app/services/utils.service';


@Component({
  selector: 'app-incidencias-tiempo',
  templateUrl: './incidencias-tiempo.component.html',
  styleUrls: ['./incidencias-tiempo.component.css']
})

export class IncidenciasTiempoComponent implements OnInit {

  //Variables Globales de la clase
  incidenciasTiempo: IncidenciasTiempo[];
  cols: any[];
  @ViewChild('dt') table: Table;
  fechaInicio:string;
  fechaFin:string;
  idServidorPublico: string = '';
  es: any;
  maxDate: Date;
  rangoAnios:string;
  theFormGroup: FormGroup;
  descnotifica: string;
  index: number = 0;
  idcancelar: string;


//Constructor de la clase
  constructor(private incidenciastiempoService: IncidenciastiempoService,
    private authenticationService: AuthenticationServiceService,
    private utilsService: UtilsService,
    private messageService: MessageService,
    private spinner: NgxSpinnerService,
    private builder: FormBuilder,
    private logger: NGXLogger) { 
      this.theFormGroup = this.builder.group({
        startDate: ["", []],
        endDate: ["", []]
      });
    }


  //Metodo principal de la clase 
  ngOnInit(): void {
    this.maxDate = new Date();
    let anio = moment(new Date()).format("YYYY");
    this.rangoAnios='1995:'+anio;
    this.iniciaCalendario();
    if (this.authenticationService.currentUserValue) {
      this.logger.debug('Usuario logueado en Home');
      this.authenticationService.currentUser.subscribe(usr => {
        this.idServidorPublico = usr.CLAVESERVIDOR;
      });
    }

    //Obtiene notificaciones en base al idServidorPublico
    this.obtenerNotificaciones();

    this.cols = [
      { field: 'CLAVEINCIDENCIA', header: 'Clave' },
      { field: 'NOMBREINCIDENCIA', header: 'Nombre' },
      { field: 'NUMEROINCIDENCIA', header: 'Número' },
      { field: 'FECHAINICIO', header: 'Fecha Inicio' },
      { field: 'FECHAFIN', header: 'Fecha Fin' },
      { field: 'NUMEROUNIDADES', header: 'Nº unidades' },
      { field: 'NOMBREPLAZA', header: 'Plaza' },
      { field: 'NUMEROPLAZA', header: 'Nº Plaza' }

    ];


    this.obtenerDatosIncidenciasTiempo();
  }

  obtenerDatosIncidenciasTiempo() {


    this.incidenciastiempoService.obteneterIncidenciasTiempo(this.idServidorPublico)
      .subscribe(data => {
        console.log(data);
        this.incidenciasTiempo = data.response;
        this.spinner.hide();
      });
  }

  consultaincidenciasTiempo(){
    if(this.fechaInicio === undefined||this.fechaFin === undefined ){
      this.messageService.add({ key: 'd', severity: 'error', summary: "Error", detail: "Seleccione filtros de Filtros de búsqueda " });
      this.spinner.hide();
    }
    this.spinner.show();
    let fechaInicio = moment(this.fechaInicio).format('YYYY-MM-DD HH:mm:ss');
    let fechaFin = moment(this.fechaFin).format('YYYY-MM-DD HH:mm:ss');
    console.log(fechaInicio,fechaFin);
    this.obtenerDatosIncidenciasTiempo();

  }



  iniciaCalendario(){
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


rechazar() {
  this.messageService.clear('c');
}



}
