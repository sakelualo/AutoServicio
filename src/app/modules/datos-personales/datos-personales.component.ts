
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DatospersonalesService } from '../../services/datospersonales.service';
import { GeneralesService } from 'src/app/services/generales.service';
import { DatosPersonalesDTO } from 'src/app/dto/datosPersonalesDTO';
import { Combo } from 'src/app/models/combo';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { BitacoraService } from 'src/app/services/bitacora.service';
import { Bitacora } from 'src/app/models/bitacora';
import { Modulo } from 'src/app/models/modulo';
import { TipoRegistro } from 'src/app/models/tipo-registro';
import { AuthenticationServiceService } from 'src/app/services/authentication-service.service';
import { NGXLogger } from 'ngx-logger';
import { DatosPersonales } from 'src/app/models/datos-personales';
import { NgxSpinnerService } from 'ngx-spinner';
import { UtilsService } from 'src/app/services/utils.service';


@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.css']
})
export class DatosPersonalesComponent implements OnInit {

//Variables Globales de la clase
  cmbEstados: Combo[] = [];
  cmbMunicipios: Combo[] = [];
  cmbColonias: Combo[] = [];
  cmbEstadoCivil: Combo[] = [];
  cmbSexo: Combo[] = [];
  datosPersonalesform: FormGroup;
  idServidorPublico: string = '';
  currentUser: DatosPersonales = new DatosPersonales();
  descnotifica: string;
  index: number = 0;
  idcancelar: string;

//Constructor de la clase
  constructor(
    private datospersonalesService: DatospersonalesService,
    private messageService: MessageService,
    private utilsService: UtilsService,
    private generalesService: GeneralesService,
    private bitacoraService: BitacoraService,
    private authenticationService: AuthenticationServiceService,
    private fb: FormBuilder,
    private router: Router,
    private spinner: NgxSpinnerService,
    private logger: NGXLogger
  ) {

  }

//Metodo principal de la clase
  ngOnInit(): void {

    if (this.authenticationService.currentUserValue) {
      this.logger.debug('Usuario logueado en Home');
      this.authenticationService.currentUser.subscribe(usr => {
        this.currentUser = usr;
        this.idServidorPublico = usr.CLAVESERVIDOR;
      });
    }
    //Obtiene notificaciones en base al idServidorPublico
    this.obtenerNotificaciones();
    this.iniciaCatalogos();
    this.listarEstados();

    

   
   this.cargaDatosPersonales();
    //this.cargaDatosServidorPublico();


    this.datosPersonalesform = this.fb.group({
      'nombre': new FormControl(''),
      'apellidoPaterno': new FormControl(''),
      'apellidoMaterno': new FormControl(''),
      'fechaNacimiento': new FormControl(''),
      'curp': new FormControl(''),

      'rfc': new FormControl(''),
      'nombrePais': new FormControl(''),
      'descripcionEscolaridad': new FormControl(''),
      'telefono': new FormControl('', Validators.required),
      'correoElectronico': new FormControl('', [Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),

      'nombreEstadoCivil': new FormControl(''),
      'idSexo': new FormControl(''),
      'idEstado': new FormControl('', Validators.required),
      'idMunicipio': new FormControl('', Validators.required),
      'colonia': new FormControl('', Validators.required),
      'calle': new FormControl('', Validators.required),


      'numeroInterior': new FormControl('', Validators.required),
      'numeroExterior': new FormControl('', Validators.required),
      'codigoPostal': new FormControl('', Validators.required)
    });
  }

  confirmacionDatosPersonales() {
    this.messageService.clear();
    this.messageService.add({ key: 'c', sticky: true, severity: 'warn', summary: '¿Estás seguro?', detail: 'Confirmar para continuar' });
  }

  guardarDatosPersonales() {
    let datosPersonalesDTO = new DatosPersonalesDTO();
    datosPersonalesDTO.correoElectronico = this.datosPersonalesform.value['correoElectronico'];
    datosPersonalesDTO.idEstado = this.datosPersonalesform.value['idEstado'];
    datosPersonalesDTO.idMunicipio = this.datosPersonalesform.value['idMunicipio'];
    datosPersonalesDTO.numeroInterior = this.datosPersonalesform.value['numeroInterior'];
    datosPersonalesDTO.numeroExterior = this.datosPersonalesform.value['numeroExterior'];
    datosPersonalesDTO.codigoPostal = this.datosPersonalesform.value['codigoPostal'];
    datosPersonalesDTO.idColonia = this.datosPersonalesform.value['colonia'];
    datosPersonalesDTO.direcion = this.datosPersonalesform.value['calle'];
    datosPersonalesDTO.telefono = this.datosPersonalesform.value['telefono'];

    this.datospersonalesService.actualizarDatosPersonales(this.idServidorPublico, datosPersonalesDTO).subscribe(() => {
      console.log('se registro');
      this.messageService.clear('c');
      this.messageService.add({ severity: 'success', summary: "Resultado", detail: "Se actualizo el servidor público correctamente." });


    }, err => {
      console.log('ocurrio un error');
      this.messageService.add({ severity: 'error', summary: "Resultado", detail: "Ocurrio un error contactar al adminstrador" });

    });

 
    this.bitacoraService.registrar(this.idServidorPublico, 1, 1).subscribe(() => {
      console.log('se registro bitacora');
    }, err => {
      console.log('ocurrio un error');
      this.messageService.add({ severity: 'error', summary: "Resultado", detail: "Ocurrio un error al guardar en la bitacora" });

    });
    this.router.navigate(['/home']);
  }


  onSubmit(value: string) {
    this.confirmacionDatosPersonales();
  }


  cargaDatosPersonales() {

    this.spinner.show();
    let datosPersonalesObj = this.datospersonalesService.cargaDatosPersonales(this.idServidorPublico, "", "", "");
    let datosCorreoObj = this.datospersonalesService.cargaDatosCorreo(this.idServidorPublico);
    let datosTelefonicosObj = this.datospersonalesService.cargaDatosTelefonicos(this.idServidorPublico);
    let datosDireccionObj = this.datospersonalesService.cargaDatosDireccion(this.idServidorPublico);
    //this.consultaCatalogoMunicipio('MEX');
    //this.consultaCatalogoColonias('001');


    this.datospersonalesService.cargaDatosDireccion(this.idServidorPublico).subscribe(
      data =>{
        console.log(data);
        if(data.codigo===200){
          this.consultaCatalogoMunicipio(data.response[0].IDESTADO);
          this.consultaCatalogoColonias(data.response[0].IDMUNICIPIOCIUDAD);
        }else{
          this.spinner.hide();
        }
      
      });

    forkJoin([datosPersonalesObj, datosCorreoObj, datosTelefonicosObj, datosDireccionObj]).subscribe(results => {

     
      let existenDatospersonales = results[0].codigo === 200 ? true : false;
      let existenDatosCorreo = results[1].codigo === 200 ? true : false;
      let existenDatosTelefono = results[2].codigo === 200 ? true : false;
      let existenDatosDireccion = results[3].codigo === 200 ? true : false;


      if (!existenDatospersonales) {
        this.messageService.add({
          severity: 'warn', summary:
            'Mensaje de advertencia', detail: 'No fue identificado el servidor público '
        });
        return;
      }
      if (!existenDatosCorreo) {
        this.messageService.add({
          severity: 'warn', summary:
            'Mensaje de advertencia', detail: 'No existen datos de correo electrónico'
        });
      }
      if (!existenDatosTelefono) {
        this.messageService.add({
          severity: 'warn', summary:
            'Mensaje de advertencia', detail: 'No existen datos telefónicos'
        });
      }
      if (!existenDatosDireccion) {
        this.messageService.add({
          severity: 'warn', summary:
            'Mensaje de advertencia', detail: 'No existen datos de dirección'
        });
      }

      if (results.length > 0) {
        console.log(existenDatosDireccion);
        console.log(results[3].response[0].IDMUNICIPIOCIUDAD);
        this.spinner.hide();
        this.datosPersonalesform = this.fb.group({
          'nombre': new FormControl(existenDatospersonales ? results[0].response[0].MOMBRE : ''),
          'apellidoPaterno': new FormControl(existenDatospersonales ? results[0].response[0].APELLIDOPATERNO : ''),
          'apellidoMaterno': new FormControl(existenDatospersonales ? results[0].response[0].APELLIDOMATERNO : ''),
          'fechaNacimiento': new FormControl(existenDatospersonales ? results[0].response[0].FECHANACIMIENTO.substring(0, 10) : ''),
          'curp': new FormControl(existenDatospersonales ? results[0].response[0].CURP : ''),

          'rfc': new FormControl(existenDatospersonales ? results[0].response[0].RFC : ''),
          'nombrePais': new FormControl(existenDatospersonales ? results[0].response[0].NOMBREPAIS : ''),
          'descripcionEscolaridad': new FormControl(existenDatospersonales ? results[0].response[0].DESCRIESCOLARIDAD : ''),
          'telefono': new FormControl(existenDatosTelefono ? results[2].response[0].NUMEROTELEFONICO : '', Validators.required),
          'correoElectronico': new FormControl(existenDatosCorreo ? results[1].response[0].CORREOELECTRONICO : ''),

          'nombreEstadoCivil': new FormControl(existenDatospersonales ? results[0].response[0].IDESTADOCIVIL : ''),
          'idSexo': new FormControl(existenDatospersonales ? results[0].response[0].IDGENERO : ''),
          'idEstado': new FormControl(existenDatosDireccion ? results[3].response[0].IDESTADO : '', Validators.required),
          'idMunicipio': new FormControl(existenDatosDireccion ? results[3].response[0].IDMUNICIPIOCIUDAD : '', Validators.required),
          'colonia': new FormControl(existenDatosDireccion ? results[3].response[0].IDCOLONIA : '', Validators.required),
          'calle': new FormControl(existenDatosDireccion ? results[3].response[0].DIRECCION1 : '', Validators.required),


          'numeroInterior': new FormControl(existenDatosDireccion ? results[3].response[0].DIRECCION4 : '', Validators.required),
          'numeroExterior': new FormControl(existenDatosDireccion ? results[3].response[0].DIRECCION2 : '', Validators.required),
          'codigoPostal': new FormControl(existenDatosDireccion ? results[3].response[0].CODIGOPOSTAL : '', Validators.required)
        });
      }else{
        this.spinner.hide();
      }
    }, error=>{

      this.spinner.hide();
        this.messageService.add({ key: 'd', severity: 'error', summary: "Resultado", detail: "Ocurrio un error" });
    });
   
  }


  cargaDatosServidorPublico() {
    //this.consultaCatalogoMunicipio('MEX');
    //this.consultaCatalogoColonias('001');
    //this.consultaCatalogoColonias('001');
    /*
    this.datospersonalesService.cargaDatosDireccion(this.idServidorPublico).subscribe(
      data =>{
        console.log(data);
        this.consultaCatalogoMunicipio(data.response[0].IDMUNICIPIOCIUDAD);
      });*/


    this.datospersonalesService.cargaDatosServidorPublico(this.idServidorPublico)
      .subscribe(data => {
       
        if (data.codigo == 200 && data.response.length>0) {

          let datosServidor= data.response[0];
         // console.log(datosServidor);
          this.datosPersonalesform = this.fb.group({
            
            'nombre': new FormControl(datosServidor.NOMBRE),
            'apellidoPaterno': new FormControl(datosServidor.PRIMERAPELLIDO),
            'apellidoMaterno': new FormControl(this.currentUser.APELLIDOMATERNO),
            'fechaNacimiento': new FormControl(datosServidor.FECHANACIMIENTO.substring(0, 10)),
            'curp': new FormControl(datosServidor.CURP),
  
            'rfc': new FormControl(datosServidor.RFC),
            'nombrePais': new FormControl(this.currentUser.NOMBREPAIS),
            'telefono': new FormControl(datosServidor.TELEFONO, Validators.required),
            'correoElectronico': new FormControl(datosServidor.CORREOELECTRONICO),
  
            'nombreEstadoCivil': new FormControl(this.currentUser.IDESTADOCIVIL),
            'idSexo': new FormControl(this.currentUser.IDGENERO),
            'idEstado': new FormControl(datosServidor.IDESTADO, Validators.required),
            'idMunicipio': new FormControl(datosServidor.IDMUNICIPIO, Validators.required),
            'colonia': new FormControl(datosServidor.IDCOLONIA, Validators.required),
            'calle': new FormControl(datosServidor.CALLE, Validators.required),
            'numeroInterior': new FormControl(datosServidor.NUMINTERIOR, Validators.required),
            'numeroExterior': new FormControl(datosServidor.NUMEXTERIOR, Validators.required),
            'codigoPostal': new FormControl(datosServidor.CODIGOPOSTAL, Validators.required)
          });
        }else{
        
            this.messageService.add({
              severity: 'warn', summary:
                'Mensaje de advertencia', detail: data.mensaje
            });
          

        }
      });

  }

  rechazar() {
    this.messageService.clear('c');
  }

  cargaMunicipios(event: any) {
    console.log(event);
    this.consultaCatalogoMunicipio(event.value);
  }

  cargaColonias(event: any) {
    this.consultaCatalogoColonias(event.value);
  }


  guardaBitacora(idServidorPublico: string, idModulo: number, idTipoRegistro: number) {

    let bitacora = new Bitacora();
    bitacora.idServidorPublico = idServidorPublico;
    let modulo = new Modulo();
    modulo.idModulo = idModulo;
    let tipoRegistro = new TipoRegistro();
    tipoRegistro.idTipoRegistro = idTipoRegistro;
    bitacora.modulo = modulo;
    bitacora.tipoRegistro = tipoRegistro;
    bitacora.descripcion = 'Se registro';
    return bitacora;
  }

  iniciaCatalogos() {
    this.consultaCatalogoEstadoCivil();
    this.consultaCatalogoSexo();

  }

  listarEstados() {
    this.datospersonalesService.cargaEstados().subscribe(data => {
      for (let index = 0; index < data.response.length; index++) {
        let estado = new Combo();
        estado.label = data.response[index].NOMBREESTADO;
        estado.value = data.response[index].IDESTADO;
        this.cmbEstados.push(estado);
      }
    });

  }

  consultaCatalogoMunicipio(idEstado: string) {
    this.cmbMunicipios = [];
    this.generalesService.consultaCatalogoMunicipio(idEstado).subscribe(data => {
      for (let index = 0; index < data.response.length; index++) {
        let municipio = new Combo();
        municipio.label = data.response[index].NOMBREMUNICIPIOCIIUDAD;
        municipio.value = data.response[index].IDMUNICIPIOCIUDAD;
        this.cmbMunicipios.push(municipio);
      }
    });

  }

  consultaCatalogoColonias(idMunicipio: string) {
    this.cmbColonias = [];
    this.generalesService.consultaCatalogoColonias(idMunicipio).subscribe(data => {

      for (let index = 0; index < data.response.length; index++) {
        let colonias = new Combo();
        colonias.label = data.response[index].NOMBRECOLONIA;
        colonias.value = data.response[index].IDCOLONIA;
        this.cmbColonias.push(colonias);
      }

    });

  }

  consultaCatalogoSexo() {

    this.cmbSexo = [];
    this.generalesService.consultaCatalogoGenero().subscribe(data => {

      for (let index = 0; index < data.response.length; index++) {
        let sexo = new Combo();
        sexo.label = data.response[index].NOMBREGENERO;
        sexo.value = data.response[index].IDGENERO;
        this.cmbSexo.push(sexo);
      }
    });
  }

  consultaCatalogoEstadoCivil() {
    this.cmbEstadoCivil = [];
    this.generalesService.consultaEstadoCivil().subscribe(data => {
      for (let index = 0; index < data.response.length; index++) {
        let eCivil = new Combo();
        eCivil.label = data.response[index].NOMBREESTADOCIVIL;
        eCivil.value = data.response[index].IDESTADOCIVIL;
        this.cmbEstadoCivil.push(eCivil);
      }
    });
  }





  /**********************Notificaciones Etiquetas************************************** */
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




  


}
