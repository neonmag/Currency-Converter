import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NumberInputDirective } from '../directives/number-input.directive';

@Component({
    selector: 'app-custom-input-currency',
    standalone: true,
    imports: [FormsModule, RouterOutlet, CommonModule, NumberInputDirective],
    templateUrl: './custom-input-currency.component.html',
    styleUrl: './custom-input-currency.component.css',
})
export class CustomInputCurrencyComponent {
    @Input() amount: number = 1;
    @Output() amountChange = new EventEmitter<number>();

    onInputChange(event: Event) {
        const newAmount = parseFloat((event.target as HTMLInputElement).value);
        this.amountChange.emit(newAmount);
    }
}
