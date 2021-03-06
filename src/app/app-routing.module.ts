import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { HomeComponent } from './modules/home/home.component';
import { PostsComponent } from './modules/posts/posts.component';
import { DatosPersonalesComponent } from './modules/datos-personales/datos-personales.component';
import { DatosProfesionalesComponent } from './modules/datos-profesionales/datos-profesionales.component';
import { DatosBancariosComponent } from './modules/datos-bancarios/datos-bancarios.component';
import { RecibosNominaComponent } from './modules/recibos-nomina/recibos-nomina.component';
import { ConsultaPagosComponent } from './modules/consulta-pagos/consulta-pagos.component';
import { IncidenciasTiempoComponent } from './modules/incidencias-tiempo/incidencias-tiempo.component';
import { ConstanciasNoAdeudoComponent } from './modules/constancias-no-adeudo/constancias-no-adeudo.component';
import { HistorialSalarialComponent } from './modules/historial-salarial/historial-salarial.component';
import { MovimientosFumpComponent } from './modules/movimientos-fump/movimientos-fump.component';
import { PerfilgeneralComponent } from './modules/perfilgeneral/perfilgeneral.component';
import { HistorialLaboralComponent } from './modules/historial-laboral/historial-laboral.component';
import { EvaluacionDesempenoComponent } from './modules/evaluacion-desempeno/evaluacion-desempeno.component';
import { DetalleEddComponent } from './modules/detalle-edd/detalle-edd.component';
import { DetalleEddUaComponent } from './modules/detalle-edd-ua/detalle-edd-ua.component';
import { EjecucionEddAmbosComponent } from './modules/ejecucion-edd-ambos/ejecucion-edd-ambos.component';
import { EjecucionEddDesempenoComponent } from './modules/ejecucion-edd-desempeno/ejecucion-edd-desempeno.component';
import { EjecucionEddDemeritosComponent } from './modules/ejecucion-edd-demeritos/ejecucion-edd-demeritos.component';
import { ReporteEddFinalizadoComponent } from './modules/reporte-edd-finalizado/reporte-edd-finalizado.component';


const routes: Routes = [{
  path: '',
  component: DefaultComponent,
  children: [{
    path: 'home',
    component: HomeComponent
  }, {
    path: 'posts',
    component: PostsComponent
  }, {
    path: 'datosPersonales',
    component: DatosPersonalesComponent
  }, {
    path: 'datosProfesionales',
    component: DatosProfesionalesComponent
  }, {
    path: 'datosBancarios',
    component: DatosBancariosComponent
  }, {
    path: 'recibosNomina',
    component: RecibosNominaComponent
  }, {
    path: 'consultaPagos',
    component: ConsultaPagosComponent
  }, {
    path: 'incidenciasTiempo',
    component: IncidenciasTiempoComponent
  }, {
    path: 'constanciaNoAdeudo',
    component: ConstanciasNoAdeudoComponent
  }, {
    path: 'historialSalarial',
    component: HistorialSalarialComponent
  }, {
    path: 'movimientosFUMP',
    component: MovimientosFumpComponent
  }
    , {
    path: 'perfilGeneral',
    component: PerfilgeneralComponent
  }
    , {
    path: 'historialLaboral',
    component: HistorialLaboralComponent
  }
  , {
    path: 'evaluacionDesempeno',
    component: EvaluacionDesempenoComponent
  }
  , {
    path: 'detalleEdd',
    component: DetalleEddComponent
  }
  , {
    path: 'detalleEddua',
    component: DetalleEddUaComponent
  }
  , {
    path: 'ejecucionEddambos',
    component: EjecucionEddAmbosComponent
  }
  , {
    path: 'ejecucionEdddesempeno',
    component: EjecucionEddDesempenoComponent
  }
  , {
    path: 'ejecucionEdddemeritos',
    component: EjecucionEddDemeritosComponent
  }
  , {
    path: 'reporteEddfinalizado',
    component: ReporteEddFinalizadoComponent
  }




  ]
},];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
