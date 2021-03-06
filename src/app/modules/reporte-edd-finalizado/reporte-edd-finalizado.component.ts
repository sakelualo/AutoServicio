import { Component, OnInit, ElementRef ,ViewChild } from '@angular/core';
//import { PdfmakeService } from 'ng-pdf-make/pdfmake/pdfmake.service';
//import { Cell, Row, Table } from 'ng-pdf-make/objects/table';
import * as jspdf from 'jspdf'; 
import html2canvas from 'html2canvas';



@Component({
  selector: 'app-reporte-edd-finalizado',
  templateUrl: './reporte-edd-finalizado.component.html',
  styleUrls: ['./reporte-edd-finalizado.component.css']
})

export class ReporteEddFinalizadoComponent implements OnInit {

  @ViewChild('htmlData') htmlData:ElementRef;



  USERS = [
    {
      "id": 1,
      "name": "Leanne Graham",
      "email": "sincere@april.biz",
      "phone": "1-770-736-8031 x56442"
    },
    {
      "id": 2,
      "name": "Ervin Howell",
      "email": "shanna@melissa.tv",
      "phone": "010-692-6593 x09125"
    },
    {
      "id": 3,
      "name": "Clementine Bauch",
      "email": "nathan@yesenia.net",
      "phone": "1-463-123-4447",
    },
    {
      "id": 4,
      "name": "Patricia Lebsack",
      "email": "julianne@kory.org",
      "phone": "493-170-9623 x156"
    },
    {
      "id": 5,
      "name": "Chelsey Dietrich",
      "email": "lucio@annie.ca",
      "phone": "(254)954-1289"
    },
    {
      "id": 6,
      "name": "Mrs. Dennis",
      "email": "karley@jasper.info",
      "phone": "1-477-935-8478 x6430"
    }
  ];




  constructor() { }

  ngOnInit(): void {

    
  }

  public openPDF() { 
    let DATA = this.htmlData.nativeElement; 
    let doc = new jspdf('p','pt', 'a4');
    doc.fromHTML(DATA.innerHTML,15,15);
    doc.output('dataurlnewwindow');
  } 

  
    
  public downloadPDF():void {
    let DATA = this.htmlData.nativeElement;
    let doc = new jspdf('p','pt', 'a4');

    let handleElement = {
      '#editor':function(element,renderer){
        return true;
      }
    };
    doc.fromHTML(DATA.innerHTML,15,15,{
      'width': 200,
      'elementHandlers': handleElement
    });

    doc.save('angular-demo.pdf');
  }







}
