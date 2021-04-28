import { TestBed, inject } from '@angular/core/testing';

import { APIcallService } from './apicall.service';

describe('ApicallService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [APIcallService]
    });
  });

  it('should be created', inject([APIcallService], (service: APIcallService) => {
    expect(service).toBeTruthy();
  }));
});
