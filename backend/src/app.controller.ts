import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  /* ── Profile Bio ──────────────────────────────────────────────── */
  @Get('profile')
  getProfile() {
    return this.appService.getProfile();
  }

  /* ── Skills ───────────────────────────────────────────────────── */
  @Get('skills')
  getSkills() {
    return this.appService.getSkills();
  }

  /* ── Projects ─────────────────────────────────────────────────── */
  @Get('projects')
  getProjects() {
    return this.appService.getProjects();
  }

  /* ── Contact Form (POST) ──────────────────────────────────────── */
  @Post('contact')
  submitContact(
    @Body() body: { name: string; email: string; message: string },
  ) {
    return this.appService.submitContact(body);
  }

  /* ── Guestbook (GET + POST) ───────────────────────────────────── */
  @Get('guestbook')
  getGuestbook() {
    return this.appService.getGuestbookEntries();
  }

  @Post('guestbook')
  addGuestbookEntry(@Body() body: { name: string; message: string }) {
    return this.appService.addGuestbookEntry(body);
  }
}
