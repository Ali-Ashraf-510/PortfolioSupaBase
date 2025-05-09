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

  // Method to insert a new message (from the contact form)
  async sendMessage(name: string, email: string, message: string) {
    const { data, error } = await this.supabase
      .from('messages')
      .insert([{ name, email, message }])
      .select();
    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }
    return data;
  }

  // Method to fetch all projects
  async getProjects() {
    const { data, error } = await this.supabase
      .from('projects')
      .select('id, title, description')
      .order('created_at', { ascending: false });
    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }
    return data;
  }

  // Method to fetch a single project by ID
  async getProjectById(id: number) {
    const { data, error } = await this.supabase
      .from('projects')
      .select('id, title, description')
      .eq('id', id)
      .single();
    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }
    return data;
  }
}