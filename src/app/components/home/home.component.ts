import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TextAnimationDirective } from '../../directives/text-animation.directive';
import { TextAnimationModule } from '../../directives/text-animation.module';
import { SupabaseService } from '../../services/supabase.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TextAnimationModule, FormsModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  // Contact form fields
  name = '';
  email = '';
  message = '';
  subject = ''; // Added subject field
  successMessage = '';
  errorMessage = '';
  
  // Current year for footer copyright
  currentYear: number = new Date().getFullYear();

  // Social media links (you can update these)
  socialLinks = {
    github: 'https://github.com/your-username',
    linkedin: 'https://linkedin.com/in/your-username',
    twitter: 'https://twitter.com/your-username',
    email: 'mailto:youremail@example.com'
  };

  constructor(private supabaseService: SupabaseService) {}

  async onSubmit() {
    if (!this.name || !this.email || !this.message) {
      this.errorMessage = 'Please fill in all required fields.';
      this.successMessage = '';
      return;
    }

    try {
      await this.supabaseService.sendMessage(this.name, this.email, this.message);
      this.successMessage = 'Message sent successfully! I will get back to you soon.';
      this.errorMessage = '';
      
      // Reset form
      this.name = '';
      this.email = '';
      this.subject = '';
      this.message = '';
    } catch (error) {
      this.errorMessage = 'Failed to send message. Please try again later.';
      this.successMessage = '';
      console.error('Error sending message:', error);
    }
  }
}