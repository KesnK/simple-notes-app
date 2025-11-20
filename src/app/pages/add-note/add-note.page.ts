import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LocalNotifications, ScheduleOptions } from '@capacitor/local-notifications';
import { DatePipe } from '@angular/common';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonItem, IonLabel, IonInput, IonTextarea,
  IonButton, IonBackButton, IonButtons,
  IonSelect, IonSelectOption,
  IonChip, IonIcon, IonList,
  IonDatetimeButton, IonModal, IonDatetime
} from '@ionic/angular/standalone';
import { NoteService } from '../../services/note.service';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.page.html',
  styleUrls: ['./add-note.page.scss'],
  standalone: true,
  imports: [
    FormsModule,
    DatePipe,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonItem, IonLabel, IonInput, IonTextarea,
    IonButton, IonBackButton, IonButtons,
    IonSelect, IonSelectOption,
    IonChip, IonIcon,
    IonDatetimeButton, IonModal, IonDatetime, IonList
  ],
})
export class AddNotePage {
  title = '';
  content = '';
  category = 'General';
  attachments: string[] = [];
  loading = false;

  // Reminder Fields
  reminderDate: string | null = null;
  today = new Date().toISOString();


  constructor(private noteService: NoteService, private router: Router) {
    this.requestNotificationPermission();
  }

  async requestNotificationPermission() {
    const perm = await LocalNotifications.requestPermissions();
    if (perm.display !== 'granted') {
      console.log('Permission denied');
      return;
    }

  }

  async save() {
    if (!this.title.trim() || !this.content.trim()) return;

    this.loading = true;

    try {
      const newNote = await this.noteService.addNote(
        this.title.trim(),
        this.content.trim(),
        this.category,
        this.attachments
      );

      if (this.reminderDate) {
        const perm = await LocalNotifications.requestPermissions();
        if (perm.display === 'granted') {
          await this.scheduleReminder(newNote.id, newNote.title, this.reminderDate);
        }
      }

      this.router.navigate(['/home']);

    } catch (err) {
      console.error('Error adding note:', err);
      alert('Failed to save note. Please try again.');
    } finally {
      this.loading = false;
    }
  }

  cancelReminder() {
    this.reminderDate = null;
  }

  async scheduleReminder(id: string, title: string, when: string) {
    const scheduleTime = new Date(when);

    await LocalNotifications.schedule({
      notifications: [
        {
          id: Number(id.replace(/\D/g, '').substring(0, 6)),
          title: 'Reminder',
          body: title,
          schedule: { at: scheduleTime, allowWhileIdle: true }
        }
      ]
    });
  }

  async addAttachment() {
    try {
      const filePicker = await (window as any).showOpenFilePicker?.();
      if (!filePicker || !filePicker[0]) return;

      const file = await filePicker[0].getFile();
      const base64 = await this.convertToBase64(file);

      const savedFile = await Filesystem.writeFile({
        path: `notes/${new Date().getTime()}_${file.name}`,
        data: base64,
        directory: Directory.Data
      });

      this.attachments.push(savedFile.uri);
    } catch (err) {
      console.error('Attachment error', err);
    }
  }


  getFileIcon(uri: string): string {
    const ext = uri.split('.').pop()?.toLowerCase();
    if (!ext) return 'document-outline';

    if (['png', 'jpg', 'jpeg', 'gif'].includes(ext)) return 'image-outline';
    if (['pdf'].includes(ext)) return 'document-text-outline';
    if (['mp4', 'mov'].includes(ext)) return 'videocam-outline';
    if (['mp3', 'wav'].includes(ext)) return 'musical-notes-outline';

    return 'document-outline'; // default
  }

  openAttachment(url: string) {
    window.open(url, '_blank'); // Open in new tab
  }

  removeAttachment(index: number) {
    this.attachments.splice(index, 1);
  }

  async convertToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve((reader.result as string).split(',')[1]);
      reader.onerror = error => reject(error);
    });
  }



  fileName(path: string) {
    return path.split('/').pop();
  }

}
