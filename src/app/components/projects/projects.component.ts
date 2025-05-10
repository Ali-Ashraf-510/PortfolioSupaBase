import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../../services/supabase.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  projects: any[] = [];
  error: string | null = null;

  constructor(private supabaseService: SupabaseService) {}

  ngOnInit() {
    this.loadProjects();
  }

  async loadProjects() {
    try {
      this.projects = await this.supabaseService.getProjects();
      this.error = null;
    } catch (err) {
      this.error ='Failed to load projects. Please try again.';
      console.error('Error loading projects:', err);
    }
  }
}