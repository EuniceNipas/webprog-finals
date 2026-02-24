"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const supabase_service_1 = require("./supabase/supabase.service");
let AppService = class AppService {
    constructor(supabase) {
        this.supabase = supabase;
    }
    async getProfile() {
        const { data, error } = await this.supabase
            .getClient()
            .from('profiles')
            .select('*')
            .single();
        if (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
        return data;
    }
    async getSkills() {
        const { data, error } = await this.supabase
            .getClient()
            .from('skills')
            .select('*')
            .order('order', { ascending: true });
        if (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
        return data;
    }
    async getProjects() {
        const { data, error } = await this.supabase
            .getClient()
            .from('projects')
            .select('*')
            .order('created_at', { ascending: false });
        if (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
        return data;
    }
    async submitContact(body) {
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
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
        return data;
    }
    async getGuestbookEntries() {
        const { data, error } = await this.supabase
            .getClient()
            .from('guestbook')
            .select('*')
            .order('created_at', { ascending: false });
        if (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
        return data;
    }
    async addGuestbookEntry(body) {
        const { data, error } = await this.supabase
            .getClient()
            .from('guestbook')
            .insert([{ name: body.name, message: body.message }])
            .select()
            .single();
        if (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
        return data;
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_service_1.SupabaseService])
], AppService);
//# sourceMappingURL=app.service.js.map