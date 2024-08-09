import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomSelectCurrencyComponent } from './custom-select-currency.component';

describe('CustomSelectCurrencyComponent', () => {
  let component: CustomSelectCurrencyComponent;
  let fixture: ComponentFixture<CustomSelectCurrencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomSelectCurrencyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomSelectCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
