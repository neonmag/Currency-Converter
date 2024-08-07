import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CurrencyInspectorService } from '../services/currency-inspector.service';
import { ConverterComponent } from './converter/converter.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, CommonModule, ConverterComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
})
export class AppComponent {
    title = 'Currency-Converter';
    currencies: { [key: string]: string } = {};
    eurValues: { [key: string]: string | number } = {};
    usdValues: { [key: string]: string | number } = {};

    constructor(private currencyInspectorService: CurrencyInspectorService) {}

    ngOnInit() {
        this.currencyInspectorService.getCurrencies().subscribe((response) => {
            this.currencies = response;
        });

        this.currencyInspectorService
            .getValueOfCurrency('eur')
            .subscribe((response) => {
                this.eurValues = response['eur'] as unknown as {
                    [key: string]: string;
                };
            });
        this.currencyInspectorService
            .getValueOfCurrency('usd')
            .subscribe((response) => {
                this.usdValues = response['usd'] as unknown as {
                    [key: string]: string;
                };
            });
    }

    getKeysOfCurrencies(obj: any): string[] {
        return Object.keys(obj);
    }
}
