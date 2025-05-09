import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../../services/supabase.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  name = '';
  email = '';
  message = '';
  successMessage = '';
  errorMessage = '';

  constructor(private supabaseService: SupabaseService) {}

  async onSubmit() {
    try {
      await this.supabaseService.sendMessage(this.name, this.email, this.message);
      this.successMessage = 'Message sent successfully!';
      this.errorMessage = '';
      // Reset form
      this.name = '';
      this.email = '';
      this.message = '';
    } catch (error) {
      this.errorMessage = 'Failed to send message. Please try again.';
      this.successMessage = '';
      console.error('Error sending message:', error);
    }
  }
}