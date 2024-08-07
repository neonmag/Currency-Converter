import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CurrencyInspectorService {
    currencies: { [key: string]: string } = {};
    currentCurrencyValue: { [key: string]: string } = {};

    constructor(private http: HttpClient) {}

    private url =
        'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json';

    getCurrencies(): Observable<{ [key: string]: string }> {
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

    getValueOfCurrency(
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
}
