import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonText,
  IonSpinner,
  IonBackButton,
  IonButtons,
  LoadingController,
  AlertController,
  ToastController
} from '@ionic/angular/standalone';
import { AuthService } from '../../services/auth.service';
import { RegisterCredentials } from '../../models/user.model';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonText,
    IonSpinner,
    IonBackButton,
    IonButtons
  ]
})
export class RegisterPage {
  credentials: RegisterCredentials = {
    email: '',
    password: '',
    displayName: ''
  };
  confirmPassword = '';
  isLoading = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private toastController: ToastController
  ) { }
  async onRegister() {
    if (!this.validateForm()) {
      return;
    }
    this.isLoading = true;
    const loading = await this.loadingController.create({
      message: 'Creating account...',
      spinner: 'crescent'
    });
    await loading.present();
    try {
await this.authService.register(this.credentials.email, this.credentials.password);
      await loading.dismiss();
      // Show success toast
      const toast = await this.toastController.create({
        message: 'Account created successfully! Welcome!',
        duration: 3000,
        color: 'success',
        position: 'top'
      });
      await toast.present();
      // Navigate to notes page
      this.router.navigate(['/notes'], { replaceUrl: true });
    } catch (error: any) {
      await loading.dismiss();
      await this.showErrorAlert(error.message);
    }
    this.isLoading = false;
  }
  navigateToLogin() {
    this.router.navigate(['/login']);
  }
  private validateForm(): boolean {
    if (!this.credentials.email.trim()) {
      this.showErrorAlert('Please enter your email address.');
      return false;
    }
    if (!this.isValidEmail(this.credentials.email)) {
      this.showErrorAlert('Please enter a valid email address.');
      return false;
    }
    if (!this.credentials.displayName?.trim()) {
      this.showErrorAlert('Please enter your display name.');
      return false;
    }
    if (!this.credentials.password) {
      this.showErrorAlert('Please enter a password.');
      return false;
    }
    if (this.credentials.password.length < 6) {
      this.showErrorAlert('Password must be at least 6 characters long.');
return false;
    }
    if (this.credentials.password !== this.confirmPassword) {
      this.showErrorAlert('Passwords do not match.');
      return false;
    }
    return true;
  }
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  private async showErrorAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
}