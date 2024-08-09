import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomInfoCurrencyComponent } from './custom-info-currency.component';

describe('CustomInfoCurrencyComponent', () => {
  let component: CustomInfoCurrencyComponent;
  let fixture: ComponentFixture<CustomInfoCurrencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomInfoCurrencyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomInfoCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
