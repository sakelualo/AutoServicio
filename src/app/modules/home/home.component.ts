import { Component, OnInit } from '@angular/core';
import { ConsultaCategorias } from 'src/app/models/consulta-categorias';
import { ConsultaEventos } from 'src/app/models/consulta-eventos';
import { CarouselInformativoServiceService } from 'src/app/services/carousel-informativo-service.service';
import { BusgenericserviceService } from 'src/app/services/busgenericservice.service';
import { SwiperOptions } from 'swiper';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EncriptdecriptService } from 'src/app/services/encriptdecript.service';
import { AuthenticationServiceService } from 'src/app/services/authentication-service.service';
import { first } from 'rxjs/operators';
import { NGXLogger } from 'ngx-logger';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [NGXLogger]
})
export class HomeComponent implements OnInit {
  config: SwiperOptions = {
    effect: 'coverflow',
    direction: 'horizontal',
    autoplay: true,
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    loop: true,
    coverflowEffect: {
      rotate: 0,
      stretch: 200.12,
      depth: 70,
      modifier: 3,
      slideShadows: false
    },
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    spaceBetween: 30
  };

  configCategorias: SwiperOptions = {
    effect: 'slide',
    direction: 'horizontal',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    spaceBetween: 2
  };

  categorias: ConsultaCategorias[] = [];
  eventos: ConsultaEventos[] = [];
  displayDialog: boolean = false;
  displayDialogLogOut: boolean = false;
  idServidorPublico: String;
  detalleEvento: ConsultaEventos = new ConsultaEventos;
  error = '';
  lbldetalle: string;


  constructor(private service: CarouselInformativoServiceService,
    private servicegeneric: BusgenericserviceService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private encriptdecriptService: EncriptdecriptService,
    private authenticationService: AuthenticationServiceService,
    private logger: NGXLogger,
    private utilsService: UtilsService) {
    this.obtenerEtiquetasHome();
  }

  ngOnInit(): void {
    if (this.authenticationService.currentUserValue) {
      //el usuario sigue en sesión 
      this.logger.debug('Usuario logueado en Home');

    } else {
      this.logger.debug('Usuario no logueado en Home');


    }


    //Obtiene los eventos
    this.obtenerTodosEventos();
    //Obtiene las categorias de los eventos
    this.logger.debug('frwsr_LPSAUT_CONS_CAT.php', { request: { funcion: 'CONSULTACATEGORIAS', IDCATEGORIA: '' } });
    this.servicegeneric.postPatch<Array<ConsultaCategorias>>('frwsr_LPSAUT_CONS_CAT.php', { request: { funcion: 'CONSULTACATEGORIAS', IDCATEGORIA: '' } })
      .subscribe({
        next: (arrPost: Array<ConsultaCategorias>) => {

          let jsonObj: any[] = this.servicegeneric.getResponseJSONObject(arrPost);

          for (let aux of jsonObj) {
            let fObj: ConsultaCategorias = <ConsultaCategorias>aux;
            this.categorias.push(fObj);

          }
        },
        error: this.logger.error
      });
  }

  /**
   * Muestro el Dialog
   * @param event 
   */
  showDialog(event: ConsultaEventos) {
    this.displayDialog = true;
    this.detalleEvento = event;
  }
  /**
   * oculta el Dialog
   */
  hideDialog() {
    this.displayDialog = false;
  }

  /**
   * Obtiene los eventos por categoria
   * @param categoria 
   */
  obtenerCategoria(categoria: ConsultaCategorias) {
    this.eventos = [];
    this.logger.debug('frwsr_LPSAUT_CONS_CAT.php', { request: { funcion: 'CONSULTAEVENTOS', IDEVENTO: '', IDCATEGORIA: categoria.IDCATEGORIA } });
    this.servicegeneric.postPatch<Array<ConsultaEventos>>('frwsr_LPSAUT_CONS_CAT.php', { request: { funcion: 'CONSULTAEVENTOS', IDEVENTO: '', IDCATEGORIA: categoria.IDCATEGORIA } })
      .subscribe({
        next: (arrPost: Array<ConsultaEventos>) => {

          let jsonObj: any[] = this.servicegeneric.getResponseJSONObject(arrPost);

          for (let aux of jsonObj) {
            let fObj: ConsultaEventos = <ConsultaEventos>aux;
            this.eventos.push(fObj);

          }
        },
        error: this.logger.error
      });
  }
  /**
   * Obtiene todos los eventos
   */
  obtenerTodosEventos() {
    this.eventos = [];
    this.logger.debug('frwsr_LPSAUT_CONS_CAT.php', { request: { funcion: 'CONSULTAEVENTOS', IDEVENTO: '', IDCATEGORIA: 'EV001' } });
    this.servicegeneric.postPatch<Array<ConsultaEventos>>('frwsr_LPSAUT_CONS_CAT.php', { request: { funcion: 'CONSULTAEVENTOS', IDEVENTO: '', IDCATEGORIA: 'EV001' } })
      .subscribe({
        next: (arrPost: Array<ConsultaEventos>) => {

          let jsonObj: any[] = this.servicegeneric.getResponseJSONObject(arrPost);

          for (let aux of jsonObj) {
            let fObj: ConsultaEventos = <ConsultaEventos>aux;
            this.eventos.push(fObj);

          }
        },
        error: this.logger.error
      });
  }

  valueIsEmpty(val: String): Boolean {
    let isEmtyVal: Boolean;
    if (val === '' || val === undefined) {
      isEmtyVal = false;
    } else {
      isEmtyVal = true;
    }
    return isEmtyVal;
  }
  /**
   * Obtiene las etiquetas para la pantalla de home
   */

  obtenerEtiquetasHome() {

    const usuario = this.utilsService.ObtenerEtiquetasPagina('/home', 'español (México)').subscribe(data => {
      Object.keys(data).map((key) => {
        if (key === 'btn.detalle') {
          this.lbldetalle = data[key];
        }
      });
    });


  }

}
