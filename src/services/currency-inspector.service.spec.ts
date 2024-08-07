import { TestBed } from '@angular/core/testing';

import { CurrencyInspectorService } from './currency-inspector.service';

describe('CurrencyInspectorService', () => {
    let service: CurrencyInspectorService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CurrencyInspectorService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
