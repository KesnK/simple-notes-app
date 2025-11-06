import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonLabel, IonButton, IonIcon,
  IonFab, IonFabButton, IonButtons,
  IonSelect, IonSelectOption, IonSearchbar,
  IonToggle, IonBadge,
  IonItemSliding, IonItemOptions, IonItemOption
} from '@ionic/angular/standalone';
import { NoteService } from '../../services/note.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonList, IonItem, IonLabel, IonButton, IonIcon, IonBadge,
    IonFab, IonFabButton, IonButtons,
    IonSelect, IonSelectOption, IonSearchbar,
    IonToggle,
    IonItemSliding, IonItemOptions, IonItemOption
  ],
})
export class HomePage {
  notes: any[] = [];
  allNotes: any[] = [];
  categories: string[] = [];
  selectedCategory = 'All';
  searchTerm = '';
  isDarkMode = false;

  constructor(
    private noteService: NoteService,
    private router: Router,
    private renderer: Renderer2,
    private authService: AuthService

  ) {
    this.loadDarkModePreference();
  }


  async logout() {
    if (confirm('Are you sure you want to log out?')) {
      await this.authService.logout();
    }
  }

  async ionViewWillEnter() {
    await this.loadNotes();
  }

  /* ── DARK MODE ── */
  loadDarkModePreference() {
    const saved = localStorage.getItem('darkMode');
    this.isDarkMode = saved === 'true';
    this.applyDarkMode();
  }

  toggleDarkMode(ev: any) {
    this.isDarkMode = ev.detail.checked;
    localStorage.setItem('darkMode', this.isDarkMode.toString());
    this.applyDarkMode();
  }

  applyDarkMode() {
    if (this.isDarkMode) {
      this.renderer.addClass(document.body, 'dark');
    } else {
      this.renderer.removeClass(document.body, 'dark');
    }
  }

  /* ── NOTES ── */
  async loadNotes() {
    this.allNotes = await this.noteService.getNotes();

    this.allNotes.forEach(note => {
      if (!note.category) note.category = 'General';
    });

    this.categories = ['All', ...new Set(this.allNotes.map(n => n.category))];

    this.filterNotes();
  }

  filterNotes() {
    let filtered = this.allNotes;

    if (this.selectedCategory !== 'All') {
      filtered = filtered.filter(note => note.category === this.selectedCategory);
    }

    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(note =>
        note.title.toLowerCase().includes(term) ||
        note.content.toLowerCase().includes(term)
      );
    }

    this.notes = filtered;
  }

  onSearch(ev: any) {
    this.searchTerm = ev.target.value?.trim().toLowerCase() || '';
    this.filterNotes();
  }

  onCategoryChange(ev: any) {
    this.selectedCategory = ev.detail.value;
    this.filterNotes();
  }

  goToAddNote() {
    this.router.navigate(['/add-note']);
  }

  async deleteNote(id: string) {
    if (confirm('Delete this note?')) {
      await this.noteService.deleteNote(id);
      await this.loadNotes();
    }
  }

  viewNote(note: any) {
    this.router.navigate(['/edit', note.id]);
  }

  trackById = (_: number, note: any) => note.id;
}
