import { TestBed } from '@angular/core/testing';

import { FirestoreInit } from './firestore-init';

describe('FirestoreInit', () => {
  let service: FirestoreInit;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirestoreInit);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
