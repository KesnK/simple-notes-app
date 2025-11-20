import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonLabel, IonSpinner, IonButton
} from '@ionic/angular/standalone';
import { NoteService, Note } from '../../services/note.service';
import { Auth, user } from '@angular/fire/auth';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonList, IonItem, IonLabel, IonSpinner, IonButton
  ],
})
export class NotesPage implements OnInit {
  notes: Note[] = [];
  loading = true;
  auth = inject(Auth);
  noteService = inject(NoteService);

  async ngOnInit() {
    const currentUser = await firstValueFrom(user(this.auth));
    if (!currentUser) {
      console.warn('No user logged in. Cannot load notes.');
      this.notes = [];
      this.loading = false;
      return;
    }

    await this.loadNotes();
  }

  async loadNotes() {
    this.loading = true;
    try {
      this.notes = await this.noteService.getNotes();
    } catch (err) {
      console.error('Error loading notes:', err);
      this.notes = [];
    } finally {
      this.loading = false;
    }
  }
}
