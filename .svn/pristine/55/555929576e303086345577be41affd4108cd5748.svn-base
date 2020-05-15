import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'
import { AutoservicioService } from 'src/app/services/autoservicio.service';
import { Menu } from 'src/app/models/menu';
import { MenuItem } from 'primeng/api/menuitem';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menu: Menu[];
  items: MenuItem[];
  lblMenu: string;
  lblnotificaciones: string;
  constructor(private service: AutoservicioService,
    private utilsService: UtilsService) {
    this.obtenerEtiquetasHome();
  }

  ngOnInit(): void {
    $("#sidebarCollapse").click(function () {
      $('#sidebar, #content').toggleClass('active');

    });

    this.service.listarMenu().subscribe(menu => {
      this.menu = menu;
    });
  }

  /**
   * Obtiene las etiquetas de la pantalla
   */
  obtenerEtiquetasHome() {

    const usuario = this.utilsService.ObtenerEtiquetasPagina('/home', 'español (México)').subscribe(data => {
      Object.keys(data).map((key) => {
        if (key === 'btn.menu') {
          this.lblMenu = data[key];
        }
        if (key === 'btn.notificaciones') {
          this.lblnotificaciones = data[key];
        }
      });
    });


  }


}
