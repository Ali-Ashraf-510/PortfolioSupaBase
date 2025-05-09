import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SupabaseService } from '../../services/supabase.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
})
export class ProjectDetailsComponent implements OnInit {
  project: any = null;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private supabaseService: SupabaseService
  ) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      try {
        this.project = await this.supabaseService.getProjectById(+id);
      } catch (error) {
        this.errorMessage = 'Failed to load project details. Please try again later.';
        console.error('Error fetching project:', error);
      }
    } else {
      this.errorMessage = 'Invalid project ID.';
    }
  }
}