import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteEddFinalizadoComponent } from './reporte-edd-finalizado.component';

describe('ReporteEddFinalizadoComponent', () => {
  let component: ReporteEddFinalizadoComponent;
  let fixture: ComponentFixture<ReporteEddFinalizadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteEddFinalizadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteEddFinalizadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
