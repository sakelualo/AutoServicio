import { Component, ViewChild, ɵConsole } from '@angular/core';
import { BnNgIdleService } from 'bn-ng-idle';
import { CountdownComponent } from 'ngx-countdown';
import { AutoservicioService } from './services/autoservicio.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthenticationServiceService } from './services/authentication-service.service';
import { NGXLogger } from 'ngx-logger';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [NGXLogger]
})


export class AppComponent {
  TIEMPO_DURACION_TIMER: String = 'TIEMPO_DURACION_TIMER';
  TIEMPO_MOSTRAR_TIMER: String = 'TIEMPO_MOSTRAR_TIMER';
  title = 'PortalAutoservicio';
  displayModal: boolean = false;
  tiempoInactividad: Number = 500;
  tiempoDurancion: number = 10;
  config = {};
  //@ViewChild('cd1') timer: CountdownComponent;
  @ViewChild('cd1', { static: false }) private timer: CountdownComponent;


  constructor(private bnIdle: BnNgIdleService, private servicio: AutoservicioService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationServiceService,
    private logger: NGXLogger) {
    //Obtiene el tiempo de duración de contador
    this.obtenerTiempoDuracionTimer();
    //Obtiene el tiempo se inactividad 
    this.obtenerParametros();
  }

  ngOnInit(): void {
    //obtiene la URL
    let urlPara: string = window.location.href;
    let paramEncripted: string[] = [];
    //valida que la URL contenga la clave se servidor publico
    if (urlPara.includes('idServidorPublico')) {
      paramEncripted = urlPara.split("idServidorPublico=");
      this.logger.debug(paramEncripted[1]);
      //desencripta la clave y obtiene el usuario en sesion 
      let claveServidor = this.obtenerParametrosSesion(paramEncripted[1]);
    } else {
      this.router.navigate(['home']);
    }

    // iniciliza el timer de inactividad
    this.bnIdle.startWatching(this.tiempoInactividad).subscribe((isTimedOut: boolean) => {
      this.logger.debug('bnIdle status = ', this.bnIdle.expired$);
      if (isTimedOut) {
        this.logger.debug('Tiempo de inactividad alcanzado');
        this.obtenerTiempoDuracionTimer();
        this.displayModal = true;
        this.timer.restart();
        this.bnIdle.stopTimer();

      } else {
        this.timer.pause;
      }
    });




  }
  /**
   * Cierra el popup de inactividad
   * e inicializa el timer 
   */
  cerrarDialog() {
    this.timer.stop();
    this.displayModal = false;
    this.bnIdle.resetTimer();
    this.router.navigate(['home']);


  }
  /**
   * cacha los eventos del timer 
   * @param $event 
   */
  handleEvent($event) {
    this.logger.debug(this.timer.i);
    this.logger.debug('Evento timer: ', $event.action)
    if ($event.action === 'done') {
      this.timer.stop();
      this.logger.debug('el timer se detuvo');

    }
    if (this.displayModal) {
      this.logger.debug('Display: ', this.displayModal);
      if (this.timer.i['value'] === 0 && this.timer.i['text'] === '00:00' && $event.action === 'stop') {
        this.logger.debug('Value es 0 ', 'Text  es 00:00 ');
        this.authenticationService.logout();
        window.open("http://189.254.70.58:9050/SIGAP_QASI/Vista/IniciarSesion.xhtml", "_self");

      }
    }





  }
  /**
   * Obtiene el tiempo para mostrar el popup de  inactividad
   */
  obtenerParametros(): Number {
    var tiemp: Number;
    this.servicio.parametroByClave(this.TIEMPO_MOSTRAR_TIMER).subscribe(parametro => {
      tiemp = Number(parametro.valorParametro);

    });
    return tiemp;
  }
  /**
   * Obtiene el tiempo de duración del timer
   */
  obtenerTiempoDuracionTimer() {
    this.servicio.parametroByClave(this.TIEMPO_DURACION_TIMER).subscribe(parametro => {
      this.tiempoDurancion = Number(parametro.valorParametro);

    });
    this.config = {
      leftTime: this.tiempoDurancion + '',
      size: 'large',
      format: 'mm:ss'
    };
  }
  /**
   * Obtiene el usuario en sesión por la clave encriptada
   * @param claveEncripted 
   */
  obtenerParametrosSesion(claveEncripted: string) {
    this.authenticationService.login(claveEncripted).then(
      () => this.redirectHome(),
      () => this.redirectAnotherSite()
    )

  }
  /**
   * Si el Login es correcto direcciona al Home
   */
  redirectHome() {
    this.logger.debug('login success');
    this.router.navigate(['home']);
  }
  /**
   * Si el Login es incorrecto destruye los objetos 
   */
  redirectAnotherSite() {
    this.logger.debug('worng login')
    this.authenticationService.logout();
  }


}
