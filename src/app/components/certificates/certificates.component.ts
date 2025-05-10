import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../../services/supabase.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-certificates',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.scss'],
})
export class CertificatesComponent implements OnInit {
  certificates: any[] = [];
  error: string | null = null;

  constructor(private supabaseService: SupabaseService) {}

  ngOnInit() {
    this.loadCertificates();
  }

  async loadCertificates() {
    try {
      this.certificates = await this.supabaseService.getCertificates();
      this.error = null;
    } catch (err) {
      this.error =   'Failed to load certificates. Please try again.';
      console.error('Error loading certificates:', err);
    }
  }
}