import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CurrencyInspectorService } from '../../services/currency-inspector.service';
import { NumberInputDirective } from '../../directives/number-input.directive';

@Component({
    selector: 'app-converter',
    standalone: true,
    imports: [RouterOutlet, CommonModule, FormsModule, NumberInputDirective],
    templateUrl: './converter.component.html',
    styleUrl: './converter.component.css',
})
export class ConverterComponent {
    currencies: { [key: string]: string } = {}; // All currencies
    values: { [key: string]: string | number } = {}; // Currency values for left selector
    rightValues: { [key: string]: string | number } = {}; // Currency values for right selector

    leftCurrency: string = '$MYRO'; // Currency name
    rightCurrency: string = '$MYRO'; // Currency name

    leftCurrencyAmount: number = 0; // Currency value&amount
    rightCurrencyAmount: number = 0; // Currency value&amount

    constructor(private currencyInspectorService: CurrencyInspectorService) {} // Service init

    ngOnInit() {
        this.currencyInspectorService.getCurrencies().subscribe(
            // Get all currencies names
            (response) => {
                this.currencies = response;
            }
        );

        this.currencyInspectorService
            .getValueOfCurrency(this.leftCurrency.toLowerCase())
            .subscribe(
                // Get currencies for left and right selectors
                (response) => {
                    this.values = response[
                        this.leftCurrency.toLowerCase()
                    ] as unknown as {
                        [key: string]: string;
                    };
                    this.rightValues = response[
                        this.rightCurrency.toLowerCase()
                    ] as unknown as { [key: string]: string };
                }
            );
    }

    swapCurrencies() {
        const tempCurrency = this.leftCurrency;
        this.leftCurrency = this.rightCurrency;
        this.rightCurrency = tempCurrency;

        const tempAmount = this.leftCurrencyAmount;
        this.leftCurrencyAmount = this.rightCurrencyAmount;
        this.rightCurrencyAmount = tempAmount;

        this.currencyInspectorService
            .getValueOfCurrency(this.leftCurrency.toLowerCase())
            .subscribe(
                // Get currencies for left and right selectors
                (response) => {
                    this.values = response[
                        this.leftCurrency.toLowerCase()
                    ] as unknown as {
                        [key: string]: string;
                    };
                }
            );
        this.currencyInspectorService
            .getValueOfCurrency(this.rightCurrency.toLowerCase())
            .subscribe(
                // Get currencies for left and right selectors
                (response) => {
                    this.rightValues = response[
                        this.rightCurrency.toLowerCase()
                    ] as unknown as { [key: string]: string };
                }
            );
    }

    getKeysOfCurrencies(obj: any): string[] {
        // Method to get all keys of currencies dictionary
        return Object.keys(obj);
    }

    onSelectorChange(event: Event) {
        // Change selected currency and value
        this.onCurrencyChange(event.target as HTMLSelectElement);
    }

    onLeftInputChange() {
        if (String(this.leftCurrencyAmount) !== null) {
            this.rightCurrencyAmount =
                this.leftCurrencyAmount *
                Number(this.values[this.rightCurrency.toLowerCase()]);
        } else {
            this.leftCurrencyAmount = 0;
            this.rightCurrencyAmount = 0;
        }
    }

    onRightInputChange() {
        if (String(this.rightCurrencyAmount) !== null) {
            this.leftCurrencyAmount =
                this.rightCurrencyAmount *
                Number(this.rightValues[this.leftCurrency.toLowerCase()]);
        } else {
            this.leftCurrencyAmount = 0;
            this.rightCurrencyAmount = 0;
        }
    }

    changeValueOnInputAfterChangeSelector() {
        this.rightCurrencyAmount =
            this.leftCurrencyAmount *
            Number(this.values[this.rightCurrency.toLowerCase()]);
    }

    onCurrencyChange(selector: HTMLSelectElement) {
        // Change currency values by selector
        const lowerCaseValue = selector.value.toLowerCase();
        if (selector.id == 'leftCurrency') {
            this.currencyInspectorService
                .getValueOfCurrency(lowerCaseValue)
                .subscribe((response) => {
                    this.values = response[lowerCaseValue] as unknown as {
                        [key: string]: string;
                    };
                    this.changeValueOnInputAfterChangeSelector();
                    console.log(this.values);
                });
        } else {
            this.currencyInspectorService
                .getValueOfCurrency(lowerCaseValue)
                .subscribe((response) => {
                    this.rightValues = response[lowerCaseValue] as unknown as {
                        [key: string]: string;
                    };
                    this.changeValueOnInputAfterChangeSelector();
                    console.log(this.rightValues);
                });
        }
    }
}
