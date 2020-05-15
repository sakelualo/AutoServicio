import { Component, OnInit, ViewChild } from '@angular/core';
import { PagosService } from 'src/app/services/pagos.service';
import { Pagos } from 'src/app/models/pagos';
import { Table } from 'primeng/table/table';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { AuthenticationServiceService } from 'src/app/services/authentication-service.service';
import { NGXLogger } from 'ngx-logger';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { UtilsService } from 'src/app/services/utils.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-consulta-pagos',
  templateUrl: './consulta-pagos.component.html',
  styleUrls: ['./consulta-pagos.component.css']
})
export class ConsultaPagosComponent implements OnInit {

//Variables Globales de la clase
  pagos: Pagos[];
  selectedPago: Pagos;
  maxDate: Date;
  fechaInicio: string;
  fechaFin: string;
  idServidorPublico: string = '';
  es: any;
  cols: any[];
  @ViewChild('dt') table: Table;
  rangoAnios: string;
  theFormGroup: FormGroup;
  descnotifica: string;
  index: number = 0;
  idcancelar: string;


  //Constructor de la clase
  constructor(private service: PagosService,
    private authenticationService: AuthenticationServiceService,
    private logger: NGXLogger,
    private utilsService: UtilsService,
    private messageService: MessageService,
    private spinner: NgxSpinnerService,
    private builder: FormBuilder,
    private router: Router) { 
      this.theFormGroup = this.builder.group({
        startDate: ["", []],
        endDate: ["", []]
      });
    }

  //Metodo principal del Componente
  ngOnInit(): void {
    this.maxDate = new Date();
    let anio = moment(new Date()).format("YYYY");
    this.rangoAnios = '1995:' + anio;

   

    this.iniciaCalendario();

    //Obtiene las etiquetas de la pantalla a mostrar
    this.obtenerEtiquetasPagina();
    if (this.authenticationService.currentUserValue) {
      this.authenticationService.currentUser.subscribe(usr => {
        this.idServidorPublico = usr.CLAVESERVIDOR;
      });
    }
    
    //Obtiene notificaciones en base al idServidorPublico
    this.obtenerNotificaciones();

    this.cols = [
      { field: 'IDSERVIDORPUBLICO', header: 'Clave de servidor público' },
      { field: 'IDPAGO', header: 'Forma Pago' },
      { field: 'ESTATUSPAGO', header: 'Estatus Pago' },
      { field: 'TIPOPAGO', header: 'Tipo Pago' },
      { field: 'FECHAPAGO', header: 'Fecha Pago' },
      { field: 'IMPORTEPAGOGRAVADO', header: 'Importe Pago Gravado' },
      { field: 'IMPORTEPAGOEXENTO', header: 'Importe Pago Exento' }
    ];

  }

  obtenerPagos(idServidorPublico: string, fechaInicio: string, fechaFin: string) {

    this.service.getPagos(idServidorPublico, fechaInicio, fechaFin)
      .subscribe(data => {
        console.log(data);
        this.pagos = data.response;
        this.spinner.hide();
      });
  }

  consultaPagos() {
    this.spinner.show();
    console.log(this.fechaInicio);
    console.log(this.fechaFin);
    console.log(this.theFormGroup);

    if (this.fechaInicio === undefined || this.fechaFin === undefined) {
      this.messageService.add({ key: 'd', severity: 'error', summary: "Error", detail: "Seleccione filtros de Filtros de búsqueda " });

    }

    let fechaInicio = moment(this.theFormGroup.value['startDate']).format('YYYY-MM-DD HH:mm:ss');
    let fechaFin = moment(this.theFormGroup.value['endDate']).format('YYYY-MM-DD HH:mm:ss');
    console.log(fechaInicio, fechaFin);
    this.obtenerPagos(this.idServidorPublico, fechaInicio, fechaFin);

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

  /**********************Notificaciones Etiquetas************************************** */

  //Metodo Obtener Etiquetas de la pagina 
  obtenerEtiquetasPagina() {
    console.log('Dentro2 de obtenerEtiquetasPagina');
    const usuario = this.utilsService.ObtenerEtiquetasPagina('/consultaPagos', 'español (México)').subscribe(data => {
      console.log(data);
    });
  }


//Metodo Obtener notificaciones
obtenerNotificaciones() {
  console.log('Dentro2 de obtenerNotificaciones');
  
  
  this.utilsService.obtenerNotificaciones(this.idServidorPublico).subscribe(data => {
    
    //console.log(data);

    
    data.forEach(obj => {

      this.descnotifica = obj[0];
      this.idcancelar = obj[1];

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

  

rechazar() {
  this.messageService.clear('c');
}



}

