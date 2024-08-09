import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-custom-info-currency',
    standalone: true,
    imports: [],
    templateUrl: './custom-info-currency.component.html',
    styleUrl: './custom-info-currency.component.css',
})
export class CustomInfoCurrencyComponent {
    @Input() currencyName: string = '$MYRO';
    @Input() targetCurrencyName: string = '$MYRO';
    @Input() exchangeRate: number = 1;
}
