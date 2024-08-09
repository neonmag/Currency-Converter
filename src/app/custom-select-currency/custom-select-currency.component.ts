import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-custom-select-currency',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './custom-select-currency.component.html',
    styleUrl: './custom-select-currency.component.css',
})
export class CustomSelectCurrencyComponent {
    @Input() currencies: any;
    @Input() selectedCurrency: string = '$myro';
    @Output() selectedCurrencyChange = new EventEmitter<string>();

    onSelectorChange(event: Event) {
        this.selectedCurrencyChange.emit(
            (event.target as HTMLSelectElement).value
        );
    }

    getKeysOfCurrencies(currencies: any): string[] {
        return Object.keys(currencies);
    }
}
