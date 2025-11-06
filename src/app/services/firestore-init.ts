import { Injectable } from '@angular/core';
import { Firestore, enableIndexedDbPersistence } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreInitService {
  constructor(private firestore: Firestore) {
    enableIndexedDbPersistence(this.firestore)
      .then(() => console.log('Firestore offline persistence enabled'))
      .catch(err => {
        if (err.code === 'failed-precondition') {
          console.warn('Multiple tabs open, persistence can only be enabled in one tab.');
        } else if (err.code === 'unimplemented') {
          console.warn('Persistence is not available in this browser.');
        }
      });
  }
}
