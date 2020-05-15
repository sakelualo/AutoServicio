import { Component, OnInit } from '@angular/core';
import { PdfmakeService } from 'ng-pdf-make/pdfmake/pdfmake.service';
import { Cell, Row, Table } from 'ng-pdf-make/objects/table';




@Component({
  selector: 'app-reporte-edd-finalizado',
  templateUrl: './reporte-edd-finalizado.component.html',
  styleUrls: ['./reporte-edd-finalizado.component.css']
})

export class ReporteEddFinalizadoComponent implements OnInit {

  constructor(public pdfmake: PdfmakeService) { }

  ngOnInit(): void {

    
  }

  
    




  generatePdf(action = 'open') {


    
  }




  htmlToPdf() {
    /*const doc = new jsPDF('letter')
    const ta = document.getElementById('pdfSink');
    doc.fromHTML(ta, 0, 0);
    doc.save('demo.pdf')*/
  }





}
