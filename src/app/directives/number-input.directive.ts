import { Directive, HostListener } from '@angular/core';

@Directive({
    selector: '[appNumberInput]',
    standalone: true,
})
export class NumberInputDirective {
    // Directive for removing all non-number symbols

    @HostListener('input', ['$event'])
    onInput(event: Event): void {
        const input = event.target as HTMLInputElement;
        input.value = input.value.replace(/\D/g, ''); // Regular expression
    }
}
