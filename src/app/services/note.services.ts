import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc
} from '@angular/fire/firestore';

export interface Note {
  id?: string; 
  title: string;
  content: string;
  category: string;
  userId?: string; 
}

@Injectable({ providedIn: 'root' })
export class NoteService {
  private collectionName = 'notes';

  constructor(private firestore: Firestore) {}

  /** ─── CREATE ─── */
  async addNote(title: string, content: string, category: string = 'General'): Promise<void> {
    const note: Omit<Note, 'id'> = { title, content, category };
    await addDoc(collection(this.firestore, this.collectionName), note);
  }

  /** ─── READ ALL ─── */
  async getNotes(): Promise<Note[]> {
    const snapshot = await getDocs(collection(this.firestore, this.collectionName));
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as Note),
    }));
  }

  /** ─── READ ONE ─── */
  async getNoteById(id: string): Promise<Note | undefined> {
    const ref = doc(this.firestore, this.collectionName, id);
    const snap = await getDoc(ref);
    if (!snap.exists()) return undefined;
    return { id: snap.id, ...(snap.data() as Note) };
  }

  /** ─── UPDATE ─── */
  async updateNote(id: string, updatedData: Partial<Note>): Promise<void> {
    const ref = doc(this.firestore, this.collectionName, id);
    await updateDoc(ref, updatedData);
  }

  /** ─── DELETE ─── */
  async deleteNote(id: string): Promise<void> {
    const ref = doc(this.firestore, this.collectionName, id);
    await deleteDoc(ref);
  }
}
