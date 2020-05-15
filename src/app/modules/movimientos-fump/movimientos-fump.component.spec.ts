import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimientosFumpComponent } from './movimientos-fump.component';

describe('MovimientosFumpComponent', () => {
  let component: MovimientosFumpComponent;
  let fixture: ComponentFixture<MovimientosFumpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovimientosFumpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovimientosFumpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
