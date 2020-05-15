import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstanciasNoAdeudoComponent } from './constancias-no-adeudo.component';

describe('ConstanciasNoAdeudoComponent', () => {
  let component: ConstanciasNoAdeudoComponent;
  let fixture: ComponentFixture<ConstanciasNoAdeudoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConstanciasNoAdeudoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstanciasNoAdeudoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
