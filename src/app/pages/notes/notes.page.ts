import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonLabel, IonSpinner
} from '@ionic/angular/standalone';
import { NoteService, Note } from '../../services/note.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonList, IonItem, IonLabel, IonSpinner
  ],
})
export class NotesPage implements OnInit {
  notes: Note[] = [];
  loading = true;

  constructor(private noteService: NoteService) {}

  async ngOnInit() {
    await this.loadNotes();
  }

  async loadNotes() {
    this.loading = true;
    try {
      this.notes = await this.noteService.getNotes();
    } catch (err) {
      console.error('Error loading notes:', err);
    } finally {
      this.loading = false;
    }
  }
}
