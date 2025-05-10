import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TextAnimationDirective } from '../../directives/text-animation.directive';
import { TextAnimationModule } from '../../directives/text-animation.module';
import { SupabaseService } from '../../services/supabase.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ CommonModule,TextAnimationModule,FormsModule,RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'] // تعديل هنا (styleUrl -> styleUrls)
})
export class HomeComponent {

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
