import { Component, OnInit } from '@angular/core';
import { BusgenericserviceService } from 'src/app/services/busgenericservice.service';
import { ConsultaCategorias } from 'src/app/models/consulta-categorias';
import { Observable } from 'rxjs';
import { RespuestaServicio } from '../../models/respuesta-servicio';

@Component({
  selector: 'app-historial-salarial',
  templateUrl: './historial-salarial.component.html',
  styleUrls: ['./historial-salarial.component.css']
})
export class HistorialSalarialComponent implements OnInit {
  categorias: ConsultaCategorias[] = [];
  constructor(private service: BusgenericserviceService) { }

  ngOnInit(): void {
    this.service.postPatch<Array<ConsultaCategorias>>('frwsr_LPSAUT_CONS_CAT.php', { request: { funcion: 'CONSULTACATEGORIAS', IDCATEGORIA: '' } })
      .subscribe({
        next: (arrPost: Array<ConsultaCategorias>) => {
          var myJSON = JSON.stringify(arrPost);
          console.log(myJSON);
          let jsonObj: any = JSON.parse(myJSON);
          let fObj: RespuestaServicio = <RespuestaServicio>jsonObj;
          this.getArray(fObj.response);
        },
        error: console.error
      });

  }

  getArray(stringArray: any) {
    for (let gh of stringArray) {
      var myJSON = JSON.stringify(gh);
      let jsonObj: any = JSON.parse(myJSON);
      let fObj: ConsultaCategorias = <ConsultaCategorias>jsonObj;
      this.categorias.push(fObj);

    }


  }

}
