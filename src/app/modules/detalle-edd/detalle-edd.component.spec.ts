import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleEddComponent } from './detalle-edd.component';

describe('DetalleEddComponent', () => {
  let component: DetalleEddComponent;
  let fixture: ComponentFixture<DetalleEddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleEddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleEddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
