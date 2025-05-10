import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  async sendMessage(name: string, email: string, message: string) {
    const { error } = await this.supabase.from('messages').insert([{ name, email, message }]);
    if (error) throw error;
  }

  async getProjects() {
    const { data, error } = await this.supabase
      .from('projects')
      .select('id, title, description, photo_url, github_url, project_type')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  }

  async getProjectById(id: number) {
    const { data, error } = await this.supabase
      .from('projects')
      .select('id, title, description, photo_url, github_url, project_type')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  }

  async getCertificates() {
    const { data, error } = await this.supabase
      .from('certificates')
      .select('id, title, issuer, issue_date, certificate_url, image_url')
      .order('issue_date', { ascending: false });
    if (error) throw error;
    return data;
  }
}