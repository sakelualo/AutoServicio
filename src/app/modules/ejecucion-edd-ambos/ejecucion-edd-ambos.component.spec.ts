import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EjecucionEddAmbosComponent } from './ejecucion-edd-ambos.component';

describe('EjecucionEddAmbosComponent', () => {
  let component: EjecucionEddAmbosComponent;
  let fixture: ComponentFixture<EjecucionEddAmbosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EjecucionEddAmbosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EjecucionEddAmbosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
