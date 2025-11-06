import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonItem, IonLabel, IonInput, IonTextarea,
  IonButton, IonBackButton, IonButtons,
  IonSelect, IonSelectOption
} from '@ionic/angular/standalone';
import { NoteService } from '../../services/note.service';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.page.html',
  styleUrls: ['./add-note.page.scss'],
  standalone: true,
  imports: [
    FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonItem, IonLabel, IonInput, IonTextarea,
    IonButton, IonBackButton, IonButtons,
    IonSelect, IonSelectOption
  ],
})
export class AddNotePage {
  title = '';
  content = '';
  category = 'General';
  loading = false;

  constructor(private noteService: NoteService, private router: Router) { }

  async save() {
    if (!this.title.trim() || !this.content.trim()) return;

    this.loading = true;
    try {
      await this.noteService.addNote(this.title.trim(), this.content.trim(), this.category);
      this.router.navigate(['/home']);
    } catch (err) {
      console.error('Error adding note:', err);
      alert('Failed to save note. Please try again.');
    } finally {
      this.loading = false;
    }
  }
}
