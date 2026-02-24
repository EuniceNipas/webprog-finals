import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getProfile(): Promise<any>;
    getSkills(): Promise<any[]>;
    getProjects(): Promise<any[]>;
    submitContact(body: {
        name: string;
        email: string;
        message: string;
    }): Promise<any>;
    getGuestbook(): Promise<any[]>;
    addGuestbookEntry(body: {
        name: string;
        message: string;
    }): Promise<any>;
}
