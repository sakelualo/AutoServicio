import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EjecucionEddDesempenoComponent } from './ejecucion-edd-desempeno.component';

describe('EjecucionEddDesempenoComponent', () => {
  let component: EjecucionEddDesempenoComponent;
  let fixture: ComponentFixture<EjecucionEddDesempenoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EjecucionEddDesempenoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EjecucionEddDesempenoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
