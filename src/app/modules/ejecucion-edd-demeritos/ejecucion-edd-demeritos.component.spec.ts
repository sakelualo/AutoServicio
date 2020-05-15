import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EjecucionEddDemeritosComponent } from './ejecucion-edd-demeritos.component';

describe('EjecucionEddDemeritosComponent', () => {
  let component: EjecucionEddDemeritosComponent;
  let fixture: ComponentFixture<EjecucionEddDemeritosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EjecucionEddDemeritosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EjecucionEddDemeritosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
