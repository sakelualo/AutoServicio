import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleEddUaComponent } from './detalle-edd-ua.component';

describe('DetalleEddUaComponent', () => {
  let component: DetalleEddUaComponent;
  let fixture: ComponentFixture<DetalleEddUaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleEddUaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleEddUaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
