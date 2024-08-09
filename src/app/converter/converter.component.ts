import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NumberInputDirective } from '../directives/number-input.directive';
import { CustomInputCurrencyComponent } from '../custom-input-currency/custom-input-currency.component';
import { CustomSelectCurrencyComponent } from '../custom-select-currency/custom-select-currency.component';
import { CustomInfoCurrencyComponent } from '../custom-info-currency/custom-info-currency.component';
import { CurrencyInspectorService } from '../services/currency-inspector.service';

@Component({
    selector: 'app-converter',
    standalone: true,
    imports: [
        RouterOutlet,
        CommonModule,
        FormsModule,
        NumberInputDirective,
        CustomInputCurrencyComponent,
        CustomSelectCurrencyComponent,
        CustomInfoCurrencyComponent,
    ],
    templateUrl: './converter.component.html',
    styleUrl: './converter.component.css',
})
export class ConverterComponent {
    currencies: { [key: string]: string } = {};

    upperCurrency = {
        selectedCurrency: '$MYRO',
        amount: 1,
    };

    lowerCurrency = {
        selectedCurrency: '$MYRO',
        amount: 1,
    };

    upperExchange: number = 1;
    lowerExchange: number = 1;

    constructor(private currencyInspectorService: CurrencyInspectorService) {}

    ngOnInit() {
        this.currencyInspectorService
            .parseCurrencies()
            .subscribe((response) => {
                this.currencies = response;
            });
        this.currencyInspectorService
            .setUpperCurrencyValue(
                this.upperCurrency.selectedCurrency.toLowerCase()
            )
            .subscribe(() => {});
        this.currencyInspectorService
            .setLowerCurrencyValue(
                this.lowerCurrency.selectedCurrency.toLowerCase()
            )
            .subscribe(() => {});

        this.upperCurrency = this.currencyInspectorService.getUpperCurrency();
        this.lowerCurrency = this.currencyInspectorService.getLowerCurrency();
    }

    syncUpperSelectorCurrency(selectedCurrency: string) {
        this.currencyInspectorService
            .setUpperCurrencyValue(selectedCurrency.toLowerCase())
            .subscribe(() => {
                this.syncUpperCurrency(this.upperCurrency.amount);
                this.upperExchange = this.getExchangeRate(
                    this.upperCurrency.selectedCurrency,
                    this.lowerCurrency.selectedCurrency
                );
            });
    }

    syncLowerSelectorCurrency(selectedCurrency: string) {
        this.currencyInspectorService
            .setLowerCurrencyValue(selectedCurrency.toLowerCase())
            .subscribe(() => {
                this.syncUpperCurrency(this.upperCurrency.amount);
                this.lowerExchange = this.getExchangeRate(
                    this.lowerCurrency.selectedCurrency,
                    this.upperCurrency.selectedCurrency
                );
            });
    }

    syncUpperCurrency(amount: number) {
        this.upperCurrency.amount = amount;
        this.lowerCurrency.amount = this.calculateLowerAmount();
        this.currencyInspectorService.setUpperCurrency(
            this.upperCurrency.selectedCurrency,
            this.upperCurrency.amount
        );
        this.currencyInspectorService.setLowerCurrency(
            this.lowerCurrency.selectedCurrency,
            this.lowerCurrency.amount
        );
    }

    syncLowerCurrency(amount: number) {
        this.lowerCurrency.amount = amount;
        this.upperCurrency.amount = this.calculateUpperAmount();
        this.currencyInspectorService.setUpperCurrency(
            this.upperCurrency.selectedCurrency,
            this.upperCurrency.amount
        );
        this.currencyInspectorService.setLowerCurrency(
            this.lowerCurrency.selectedCurrency,
            this.lowerCurrency.amount
        );
    }

    calculateLowerAmount(): number {
        const lowerAmount =
            this.currencyInspectorService.getUpperCurrencyValue();
        return (
            this.upperCurrency.amount *
            Number(
                lowerAmount[this.lowerCurrency.selectedCurrency.toLowerCase()]
            )
        );
    }

    calculateUpperAmount(): number {
        const upperAmount =
            this.currencyInspectorService.getLowerCurrencyValue();
        return (
            this.lowerCurrency.amount *
            Number(
                upperAmount[this.upperCurrency.selectedCurrency.toLowerCase()]
            )
        );
    }

    swapCurrencies() {
        const upperCurrencyTemp = {
            selectedCurrency: this.upperCurrency.selectedCurrency,
            amount: this.upperCurrency.amount,
        };
        const lowerCurrencyTemp = {
            selectedCurrency: this.lowerCurrency.selectedCurrency,
            amount: this.lowerCurrency.amount,
        };

        this.currencyInspectorService.setUpperCurrency(
            lowerCurrencyTemp.selectedCurrency,
            lowerCurrencyTemp.amount
        );
        this.currencyInspectorService.setLowerCurrency(
            upperCurrencyTemp.selectedCurrency,
            upperCurrencyTemp.amount
        );

        this.upperCurrency = this.currencyInspectorService.getUpperCurrency();
        this.lowerCurrency = this.currencyInspectorService.getLowerCurrency();

        this.currencyInspectorService
            .setUpperCurrencyValue(
                this.upperCurrency.selectedCurrency.toLowerCase()
            )
            .subscribe();

        this.currencyInspectorService
            .setLowerCurrencyValue(
                this.lowerCurrency.selectedCurrency.toLowerCase()
            )
            .subscribe();
    }

    getExchangeRate(sourceCurrency: string, targetCurrency: string): number {
        const source = sourceCurrency;
        const target = targetCurrency;

        if (source == this.upperCurrency.selectedCurrency) {
            const exchangeRes =
                this.currencyInspectorService.getUpperCurrencyValue()[
                    target.toLowerCase()
                ];
            this.lowerExchange = Number(
                this.currencyInspectorService.getLowerCurrencyValue()[
                    source.toLowerCase()
                ]
            );
            return Number(exchangeRes);
        } else {
            const exchangeRes =
                this.currencyInspectorService.getLowerCurrencyValue()[
                    target.toLowerCase()
                ];
            this.upperExchange = Number(
                this.currencyInspectorService.getUpperCurrencyValue()[
                    source.toLowerCase()
                ]
            );
            return Number(exchangeRes);
        }
    }
}
