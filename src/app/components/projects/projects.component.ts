import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router'; // Correct import for RouterLink
import { SupabaseService } from '../../services/supabase.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [RouterLink,CommonModule], // RouterLink is a directive, which is valid
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  projects: any[] = [];
  errorMessage: string | null = null;

  constructor(private supabaseService: SupabaseService) {}

  async ngOnInit() {
    try {
      this.projects = await this.supabaseService.getProjects();
    } catch (error) {
      this.errorMessage = 'Failed to load projects. Please try again later.';
      console.error('Error fetching projects:', error);
    }
  }
}