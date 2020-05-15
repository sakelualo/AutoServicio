import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialSalarialComponent } from './historial-salarial.component';

describe('HistorialSalarialComponent', () => {
  let component: HistorialSalarialComponent;
  let fixture: ComponentFixture<HistorialSalarialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistorialSalarialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialSalarialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
