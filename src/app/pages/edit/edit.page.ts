import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonItem, IonLabel, IonInput, IonTextarea,
  IonButton, IonBackButton, IonButtons,
  IonSelect, IonSelectOption, IonSpinner
} from '@ionic/angular/standalone';
import { NoteService } from '../../services/note.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonTextarea,
    IonButton, IonBackButton, IonButtons,
    IonSelect, IonSelectOption,
    IonSpinner
  ],

})
export class EditNotePage implements OnInit {
  title = '';
  content = '';
  category = 'General';
  categories = ['General', 'Work', 'Personal', 'Ideas', 'Other'];
  noteId!: string;  // Firebase uses string IDs
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private noteService: NoteService
  ) { }

  async ngOnInit() {
    this.noteId = this.route.snapshot.paramMap.get('id') ?? '';
    if (!this.noteId) {
      this.router.navigate(['/home']);
      return;
    }

    // Load note from Firestore
    try {
      const note = await this.noteService.getNoteById(this.noteId);
      if (note) {
        this.title = note.title;
        this.content = note.content;
        this.category = note.category || 'General';
      } else {
        this.router.navigate(['/home']);
      }
    } catch (err) {
      console.error('Error loading note:', err);
      this.router.navigate(['/home']);
    }
  }

  async updateNote() {
    const t = this.title.trim();
    const c = this.content.trim();
    if (!t || !c) return;

    this.loading = true;
    try {
      await this.noteService.updateNote(this.noteId, { title: t, content: c, category: this.category });
      this.router.navigate(['/home']);
    } catch (err) {
      console.error('Error updating note:', err);
    } finally {
      this.loading = false;
    }
  }
}
