import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CurrencyInspectorService {
    currencies: { [key: string]: string } = {};
    currentCurrencyValue: { [key: string]: string } = {};

    lowerCurrency = { selectedCurrency: '$MYRO', amount: 1 };
    upperCurrency = { selectedCurrency: '$MYRO', amount: 1 };

    lowerCurrencyValue: { [key: string]: string } = {};
    upperCurrencyValue: { [key: string]: string } = {};

    constructor(private http: HttpClient) {}

    private url =
        'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json';

    parseCurrencies(): Observable<{ [key: string]: string }> {
        // Get all currencies
        return this.http.get<{ [key: string]: string }>(this.url).pipe(
            map((response) => {
                const upperCaseResponse: { [key: string]: string } = {};
                for (const key in response) {
                    if (response.hasOwnProperty(key)) {
                        upperCaseResponse[key.toUpperCase()] =
                            response[key].toUpperCase();
                    }
                }
                this.currencies = upperCaseResponse;
                return this.currencies;
            })
        );
    }

    parseValueOfCurrency(
        currency: string
    ): Observable<{ [key: string]: string }> {
        // Get info for specific currency
        const apiUrl = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`;
        return this.http.get<{ [key: string]: string }>(apiUrl).pipe(
            map((response) => {
                this.currentCurrencyValue = response;
                return this.currentCurrencyValue;
            })
        );
    }

    setLowerCurrency(currency: string, amount: number) {
        this.lowerCurrency.selectedCurrency = currency;
        this.lowerCurrency.amount = amount;
    }

    setUpperCurrency(currency: string, amount: number) {
        this.upperCurrency.selectedCurrency = currency;
        this.upperCurrency.amount = amount;
    }

    getLowerCurrency() {
        return this.lowerCurrency;
    }

    getUpperCurrency() {
        return this.upperCurrency;
    }

    setLowerCurrencyValue(
        currency: string
    ): Observable<{ [key: string]: string }> {
        return this.parseValueOfCurrency(currency.toLowerCase()).pipe(
            map((response) => {
                this.lowerCurrencyValue = response[
                    this.lowerCurrency.selectedCurrency.toLowerCase()
                ] as unknown as { [key: string]: string };
                return this.lowerCurrencyValue;
            })
        );
    }

    setUpperCurrencyValue(
        currency: string
    ): Observable<{ [key: string]: string }> {
        return this.parseValueOfCurrency(currency.toLowerCase()).pipe(
            map((response) => {
                this.upperCurrencyValue = response[
                    this.upperCurrency.selectedCurrency.toLowerCase()
                ] as unknown as { [key: string]: string };
                return this.upperCurrencyValue;
            })
        );
    }

    getLowerCurrencyValue(): { [key: string]: string } {
        return this.lowerCurrencyValue;
    }

    getUpperCurrencyValue(): { [key: string]: string } {
        return this.upperCurrencyValue;
    }
}
