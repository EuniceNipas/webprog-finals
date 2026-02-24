import { SupabaseService } from './supabase/supabase.service';
export declare class AppService {
    private readonly supabase;
    constructor(supabase: SupabaseService);
    getProfile(): Promise<any>;
    getSkills(): Promise<any[]>;
    getProjects(): Promise<any[]>;
    submitContact(body: {
        name: string;
        email: string;
        message: string;
    }): Promise<any>;
    getGuestbookEntries(): Promise<any[]>;
    addGuestbookEntry(body: {
        name: string;
        message: string;
    }): Promise<any>;
}
