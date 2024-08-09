import { Component, NgZone, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CurrencyInspectorService } from './services/currency-inspector.service';
import { ConverterComponent } from './converter/converter.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, CommonModule, ConverterComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
})
export class AppComponent implements AfterViewInit {
    title = 'Currency-Converter';
    currencies: { [key: string]: string } = {};
    eurValues: { [key: string]: string | number } = {};
    usdValues: { [key: string]: string | number } = {};

    constructor(
        private zone: NgZone,
        private currencyInspectorService: CurrencyInspectorService
    ) {}

    ngAfterViewInit() {
        this.zone.runOutsideAngular(() => {
            setTimeout(() => {
                this.zone.run(() => {
                    this.onValueInit();
                });
            }, 0);
        });
    }
    onValueInit() {
        this.currencyInspectorService
            .parseCurrencies()
            .subscribe((response) => {
                this.currencies = response;
            });

        this.currencyInspectorService
            .parseValueOfCurrency('eur')
            .subscribe((response) => {
                this.eurValues = response['eur'] as unknown as {
                    [key: string]: string;
                };
            });
        this.currencyInspectorService
            .parseValueOfCurrency('usd')
            .subscribe((response) => {
                this.usdValues = response['usd'] as unknown as {
                    [key: string]: string;
                };
            });
    }

    onDivClick() {
        this.onValueInit();
    }

    getKeysOfCurrencies(obj: any): string[] {
        return Object.keys(obj);
    }
}
