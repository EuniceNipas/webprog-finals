import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { SupabaseService } from './supabase/supabase.service';

@Injectable()
export class AppService {
  constructor(private readonly supabase: SupabaseService) {}

  // ─── GET /api/profile ────────────────────────────────────────────
  async getProfile() {
    const { data, error } = await this.supabase
      .getClient()
      .from('profiles')
      .select('*')
      .single();

    if (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
    return data;
  }

  // ─── GET /api/skills ─────────────────────────────────────────────
  async getSkills() {
    const { data, error } = await this.supabase
      .getClient()
      .from('skills')
      .select('*')
      .order('order', { ascending: true });

    if (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
    return data;
  }

  // ─── GET /api/projects ───────────────────────────────────────────
  async getProjects() {
    const { data, error } = await this.supabase
      .getClient()
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
    return data;
  }

  // ─── POST /api/contact ──────────────────────────────────────────
  async submitContact(body: {
    name: string;
    email: string;
    message: string;
  }) {
    const { data, error } = await this.supabase
      .getClient()
      .from('contacts')
      .insert([
        {
          name: body.name,
          email: body.email,
          message: body.message,
        },
      ])
      .select()
      .single();

    if (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
    return data;
  }

  // ─── GET /api/guestbook ─────────────────────────────────────────
  async getGuestbookEntries() {
    const { data, error } = await this.supabase
      .getClient()
      .from('guestbook')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
    return data;
  }

  // ─── POST /api/guestbook ────────────────────────────────────────
  async addGuestbookEntry(body: { name: string; message: string }) {
    const { data, error } = await this.supabase
      .getClient()
      .from('guestbook')
      .insert([{ name: body.name, message: body.message }])
      .select()
      .single();

    if (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
    return data;
  }
}
