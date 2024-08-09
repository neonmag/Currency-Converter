import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomInputCurrencyComponent } from './custom-input-currency.component';

describe('CustomInputCurrencyComponent', () => {
  let component: CustomInputCurrencyComponent;
  let fixture: ComponentFixture<CustomInputCurrencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomInputCurrencyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomInputCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
