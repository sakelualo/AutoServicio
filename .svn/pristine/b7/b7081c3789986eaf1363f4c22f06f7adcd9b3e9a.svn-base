import { Component, OnInit } from '@angular/core';
import { AutoservicioService } from 'src/app/services/autoservicio.service';
import { Menu } from 'src/app/models/menu';
import { MenuItem } from 'primeng/api/menuitem';
import { DatosPersonales } from 'src/app/models/datos-personales';
import { BusgenericserviceService } from 'src/app/services/busgenericservice.service';
import { DatosPersonalesComponent } from 'src/app/modules/datos-personales/datos-personales.component';
import { BnNgIdleService } from 'bn-ng-idle';
import { AuthenticationServiceService } from 'src/app/services/authentication-service.service';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  menu: Menu[];
  items: MenuItem[];
  datosPersonales: DatosPersonales = new DatosPersonales();
  idServidorPublico: String = '';
  nombreServidorPublico: String = '';
  constructor(private service: AutoservicioService,
    private servicegeneric: BusgenericserviceService,
    private bnIdle: BnNgIdleService,
    private authenticationService: AuthenticationServiceService,
    private logger: NGXLogger) {
    if (this.authenticationService.currentUserValue) {
      //el usuario sigue en sesión 
      this.logger.debug('recuperando sesion para sidaber');

      this.authenticationService.currentUser.subscribe(usr => {

        this.logger.log(usr);

        this.datosPersonales = usr;
       


        this.logger.debug('Datos de sesion recuperados (Sidebar) => ', this.datosPersonales);
      })
    };

  }
  ngOnInit(): void {
    //this.obtenerDatosPersonales();
    this.obtenerMenu();
  }

  obtenerMenu() {
    this.logger.debug('Obteniendo opciones de menu');
    this.service.listarMenu().subscribe(menu => {
      this.menu = menu;
    });
  }



  cerrarsession() {
    window.open("http://189.254.70.58:9050/SIGAP_QASI/Vista/IniciarSesion.xhtml", "_self");
    sessionStorage.removeItem('currentUser');
    this.logger.debug('eliminando parametros de sesion');
  }

}
