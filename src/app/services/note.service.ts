import { Injectable } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import { firstValueFrom } from 'rxjs';
import {
  Firestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where
} from '@angular/fire/firestore';

export interface Note {
  id: string;
  title: string;
  content: string;
  category: string;
  userId: string;
  attachments?: string[];
}

@Injectable({ providedIn: 'root' })
export class NoteService {
  private collectionName = 'notes';

  constructor(private firestore: Firestore, private auth: Auth) { }

  private getCurrentUserId(): string {
    const uid = this.auth.currentUser?.uid;
    if (!uid) throw new Error('User not logged in');
    return uid;
  }

  /** ─── CREATE ─── */
  async addNote(
    title: string,
    content: string,
    category: string = 'General',
    attachments: string[] = []
  ): Promise<Note> {
    const userId = this.getCurrentUserId();
    if (!userId) throw new Error('User not logged in');

    const noteData: Omit<Note, 'id'> = { title, content, category, userId, attachments };

    const docRef = await addDoc(collection(this.firestore, this.collectionName), noteData);

    return { id: docRef.id, ...noteData };
  }



  /** ─── READ ─── */
  async getNotes(): Promise<Note[]> {
    const userId = this.getCurrentUserId();

    const notesRef = collection(this.firestore, this.collectionName);
    const q = query(notesRef, where('userId', '==', userId));
    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as Omit<Note, 'id'>)
    }));
  }

  async getNoteById(id: string): Promise<Note | undefined> {
    const ref = doc(this.firestore, this.collectionName, id);
    const snap = await getDoc(ref);
    if (!snap.exists()) return undefined;

    const data = snap.data() as Omit<Note, 'id'>;
    return { id: snap.id, ...data };
  }

  /** ─── UPDATE ─── */
  async updateNote(
    id: string,
    updatedData: Partial<Note> & { attachments?: string[] }
  ): Promise<void> {
    const userId = this.getCurrentUserId();
    const ref = doc(this.firestore, this.collectionName, id);

    const snap = await getDoc(ref);
    if (!snap.exists()) throw new Error('Note not found');

    const note = snap.data() as Note;
    if (note.userId !== userId) throw new Error('You do not have permission to update this note');

    await updateDoc(ref, updatedData);
  }


  /** ─── DELETE ─── */
  async deleteNote(id: string): Promise<void> {
    const userId = this.getCurrentUserId();
    const ref = doc(this.firestore, this.collectionName, id);

    const snap = await getDoc(ref);
    if (!snap.exists()) throw new Error('Note not found');

    const note = snap.data() as Note;
    if (note.userId !== userId) throw new Error('You do not have permission to delete this note');

    await deleteDoc(ref);
  }
}
