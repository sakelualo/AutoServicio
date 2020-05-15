import { Component, OnInit, ViewChild } from '@angular/core';
import { TestBus } from 'src/app/models/test-bus';
import { TestBusServiceService } from 'src/app/services/test-bus-service.service';
import { DatosBancarios } from 'src/app/models/datos-bancarios';
import { DatosBancariosService } from 'src/app/services/datos-bancarios.service';
import { Bancos } from 'src/app/models/bancos';
import { Table } from 'primeng/table/table';
import { BusgenericserviceService } from 'src/app/services/busgenericservice.service';
import { AuthenticationServiceService } from 'src/app/services/authentication-service.service';
import { NgxSpinnerService } from "ngx-spinner";
import { UtilsService } from 'src/app/services/utils.service';
import { NGXLogger } from 'ngx-logger';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';


@Component({
  selector: 'app-datos-bancarios',
  templateUrl: './datos-bancarios.component.html',
  styleUrls: ['./datos-bancarios.component.css'],
  providers: [DatosBancariosService]
})
export class DatosBancariosComponent implements OnInit {
  
  //Variables Globales de  la clase
  datosBancarios: DatosBancarios[] = [];
  bancos: Bancos[];
  bancoSelected: Bancos;
  displayDialog: boolean = false;
  idServidorPublico: string = '';
  @ViewChild('dt') table: Table;
  ttltitulopagbancarios: string;
  lblbanco: string;
  lblnumcuenta: string;
  lbltitular: string;
  lblfechaapertura: string;
  lblfechavigencia: string;
  lblplaza: string;
  descnotifica: string;
  index: number = 0;
  idcancelar: string;



  //Constructor de la clase
  constructor(private service: DatosBancariosService,
    private servicegeneric: BusgenericserviceService,
    private messageService: MessageService,
    private authenticationService: AuthenticationServiceService,
    private spinner: NgxSpinnerService,
    private utilsService: UtilsService,
    private logger: NGXLogger) {
    this.obtenerEtiquetasBancarios();
  }

//Metodo principal de la clase 
  ngOnInit(): void {
    //this.datosBancarios = this.service.getDatosBancarios();   
    //Obtene la clave de servidor publico     
    if (this.authenticationService.currentUserValue) {
      this.authenticationService.currentUser.subscribe(us => {
        this.idServidorPublico = us.CLAVESERVIDOR;
      })

    }

    //Obtiene notificaciones en base al idServidorPublico
    this.obtenerNotificaciones();

    //Obtiene los datos bancaios del servidor publico
    this.obtenerDatosBancarios(this.idServidorPublico);
  }
  /**
   * Muestra el cuadro de dialogo para agregar un nuevo banco
   */
  showDialog() {
    this.displayDialog = true;
  }
  /**
   * Oculta el cuadro de dialogo para agregar un nuevo banco 
   */
  hideDialog() {
    this.displayDialog = false;
  }
  /**
   * Obtiene los datos bancarios de un servidor publico por su clave
   */
  obtenerDatosBancarios(claveServidor: String) {
    this.servicegeneric.postPatch<Array<DatosBancarios>>('frwsr_LPSAUT_CONS.php', { request: { funcion: 'consultarDatosBancarios', IDSERVIDORPUBLICO: claveServidor } })
      .subscribe({
        next: (arrPost: Array<DatosBancarios>) => {

          let jsonObj: any[] = this.servicegeneric.getResponseJSONObject(arrPost);
          console.log(jsonObj);
          for (let aux of jsonObj) {
            let fObj: DatosBancarios = <DatosBancarios>aux;
            this.datosBancarios.push(fObj);
          }
        },
        error: console.error
      });

  }

  /**
 * Obtiene las etiquetas de la pantalla
 */
  obtenerEtiquetasBancarios() {

    const usuario = this.utilsService.ObtenerEtiquetasPagina('/datosBancarios', 'español (México)').subscribe(data => {
      this.logger.debug(data);
      Object.keys(data).map((key) => {

        if (key === 'ttl.titulopagbancarios') {
          this.ttltitulopagbancarios = data[key];
        }
        if (key === 'lbl.banco') {
          this.lblbanco = data[key];
        }
        if (key === 'lbl.numcuenta') {
          this.lblnumcuenta = data[key];
        }
        if (key === 'lbl.titular') {
          this.lbltitular = data[key];
        }
        if (key === 'lbl.fechaapertura') {
          this.lblfechaapertura = data[key];
        }
        if (key === 'lbl.fechavigencia') {
          this.lblfechavigencia = data[key];
        }
        if (key === 'lbl.plaza') {
          this.lblplaza = data[key];
        }

      });
    });


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


rechazar() {
  this.messageService.clear('c');
}
  



}

