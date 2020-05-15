import { Component, OnInit, ViewChild } from '@angular/core';
import { ConstanciaadeudoService } from 'src/app/services/constanciaadeudo.service';
import { ConstanciaAdeudo } from 'src/app/models/constancia-adeudo';
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


@Component({
  selector: 'app-constancias-no-adeudo',
  templateUrl: './constancias-no-adeudo.component.html',
  styleUrls: ['./constancias-no-adeudo.component.css']
})
export class ConstanciasNoAdeudoComponent implements OnInit {

//Variables Globales de la clase
  constanciaAdeudos: ConstanciaAdeudo[];
  map = new Map<String, String>();
  cols: any[];
  @ViewChild('dt') table: Table;
  items: MenuItem[];
  constanciaNoAdeudoForm: FormGroup;
  displayDialog: boolean;
  estatuspago: string;
  btnguardar: string;
  fechapago: string;
  servpublico: string;
  justificacion: string;
  titulopagcons: string;
  btnnuevasol: string;
  impagoagravado: string;
  tipopago: string;
  btncancelar: string;
  plaza: string;
  fecha: string;
  idservpublico: string;
  idServidorPublico: string = '';
  nombreServidorPublico: string = '';
  descnotifica: string;
  index: number = 0;
  idcancelar: string;


  

//Constructor del Componente
  constructor(
    private constanciaadeudoService: ConstanciaadeudoService,
    private utilsService: UtilsService,
    private messageService: MessageService,
    private authenticationService: AuthenticationServiceService,
    private logger: NGXLogger,
    private spinner: NgxSpinnerService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder) { }


//Metodo principal del Componente
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
    this.constanciaNoAdeudoForm = this.fb.group({
      'idServidorPublico': new FormControl(this.idServidorPublico),
      'nombreServidorPublico': new FormControl(this.nombreServidorPublico),
      'plaza': new FormControl('Toluca'),
      'fecha': new FormControl(fecha),
      'justificacion': new FormControl('', Validators.required)
    });
    this.obtenerConstanciaNoAdeudo();

    
    //Obtiene las etiquetas de la pantalla a mostrar
    this.obtenerEtiquetasPagina();

    


    this.cols = [
      { field: 'FECHASOLICITUD', header: 'Fecha' },
      { field: 'RESPUESTA', header: 'Gestor Administrativo'},
      { field: 'JUSTIFICACION', header: 'Comentarios' },
      { field: 'CONSTANCIAPDF', header: 'Estatus' },
      { field: '', header: 'Archivo' }
    ];  

  }
  

  showSaveDialog() {
    this.displayDialog=true;
    let fecha = moment(new Date()).locale('es').format('Do-MMMM-YYYY');
    this.constanciaNoAdeudoForm = this.fb.group({
      'idServidorPublico': new FormControl(this.idServidorPublico),
      'nombreServidorPublico': new FormControl(this.nombreServidorPublico),
      'plaza': new FormControl('Toluca'),
      'fecha': new FormControl(fecha),
      'justificacion': new FormControl('', Validators.required)
    });
  }

  obtenerConstanciaNoAdeudo() {
    this.spinner.show();
    this.constanciaadeudoService.obtenerConstanciaNoAdeudo(this.idServidorPublico)
      .subscribe((data) => {
        this.spinner.hide();
        this.constanciaAdeudos = data.response;
      });
  }


/**********************Notificaciones Etiquetas***************************************/
//Metodo Obtener Etiquetas de la pagina  
obtenerEtiquetasPagina() {
    console.log('Dentro2 de obtenerEtiquetasPagina');


    const usuario = this.utilsService.ObtenerEtiquetasPagina('/constanciaNoAdeudo','español (México)').subscribe(data => {

      this.logger.debug(data);

      Object.keys(data).map((key) => {
        //console.log(key);
        //console.log(data[key]);

        if (key === 'lbl.estatuspago') {
          //console.log("Si es Igual =======>" + key);
          //console.log("Valor de la llave =======>" + data[key]);

          this.estatuspago = data[key];

          //console.log("Valor de la variable  (estatuspago)=======>" + this.estatuspago);
        }

        
        if (key === 'btn.guardar') {

          this.btnguardar = data[key];

          //console.log("Valor de la variable  (btnguardar)=======>" + this.btnguardar);
        }

        
        if (key === 'lbl.fechapago') {

          this.fechapago = data[key];

          //console.log("Valor de la variable  (fechapago)=======>" + this.fechapago);
        }

        

        if (key === 'lbl.servpublico') {

          this.servpublico = data[key];

          //console.log("Valor de la variable  (servpublico)=======>" + this.servpublico);
        }

        

        if (key === 'lbl.justificacion') {

          this.justificacion = data[key];

          //console.log("Valor de la variable  (justificacion)=======>" + this.justificacion);
        }

        
        if (key === 'ttl.titulopagcons') {

          this.titulopagcons = data[key];

          //console.log("Valor de la variable  (titulopagcons)=======>" + this.titulopagcons);
        }

        
        if (key === 'btn.btnnuevasolicitud') {

          this.btnnuevasol = data[key];

          //console.log("Valor de la variable  (btnnuevasol)=======>" + this.btnnuevasol);
        }

        
        if (key === 'lbl.impagoagravado') {

          this.impagoagravado = data[key];

          //console.log("Valor de la variable  (impagoagravado)=======>" + this.impagoagravado);
        }


        if (key === 'lbl.tipopago') {

          this.tipopago = data[key];

          //console.log("Valor de la variable  (tipopago)=======>" + this.tipopago);
        }

        
        if (key === 'btn.cancelar') {

          this.btncancelar = data[key];

          //console.log("Valor de la variable  (cancelar)=======>" + this.btncancelar);
        }

        if (key === 'lbl.plaza') {

          this.plaza = data[key];

          //console.log("Valor de la variable  (plaza)=======>" + this.plaza);
        }


        if (key === 'lbl.fecha') {

          this.fecha = data[key];

          //console.log("Valor de la variable  (fecha)=======>" + this.fecha);
        }

        
        if (key === 'lbl.idservpublico') {

          this.idservpublico = data[key];

          //console.log("Valor de la variable  (idservpublico)=======>" + this.idservpublico);
        }



      });



    });

    
     
    console.log('Saliendo2 de obtenerEtiquetasPagina');

  }



  

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



      /*for (let index = 0; index <= 1; index++) {
        
        console.log(obj[index]);
        
      }*/
     

      

      /*Object.entries(obj).forEach(([key, value]) => {
          //console.log(`${key} ${value}`);
          //console.log('::::::::::::::::::::::::');
          
         

            if (key === 'descnotificacion') {
              this.descnotifica = `${value}`;
              console.log("Valor de la variable  (descnotifica)=======>" + this.descnotifica);

              console.log("Valor de index111 " + this.index);
              if(this.index <= 4 ){
                 this.index++;
                  console.log("Valor de index222 " + this.index);
                  this.messageService.add({key:'notifi', severity:'warn', summary: 
                  'Tienes Notificaciones Por Revisar', detail: this.descnotifica});
              }


            }

          
      });*/
      console.log('-------------------');
      
  });

  });

  console.log('Saliendo2 de obtenerNotificaciones');
  

}







  confirmacionConstanciaNoAdeudo() {
    console.log('ss');
    this.messageService.clear();
    this.messageService.add({ key: 'c', sticky: true, severity: 'warn', summary: '¿Estás seguro?', detail: 'Confirmar para continuar' });
  }

  solicitarConstanciaAdeudo(){

    this.spinner.show();
    this.constanciaadeudoService.
        insertaSolicitudConstanciaNoAdeudo(this.idServidorPublico,this.constanciaNoAdeudoForm.value['justificacion']).pipe(switchMap(() => {
            return     this.constanciaadeudoService.obtenerConstanciaNoAdeudo(this.idServidorPublico)
          })).subscribe(data => {
            this.constanciaAdeudos = data.response;
           
            this.messageService.clear('c');
            this.messageService.add({ key: 'd', severity: 'success', summary: "Resultado", detail: "La operación se realizó correctamente." });
            this.displayDialog = false;
            this.spinner.hide();
          }, err =>{
            this.messageService.add({ key: 'd', severity: 'error', summary: "Resultado", detail: "Ocurrio un error" });
            this.spinner.hide();
          }); 
   
  }

  rechazar() {
    this.messageService.clear('c');
  }


  no(){
    this.displayDialog=false;
  
  }

}
