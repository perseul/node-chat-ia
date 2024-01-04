import { Repository } from 'typeorm';
import { Setting } from '../entities/Setting';
import { SettingsRepository } from '../repositories/SettingsRepository';
import { appDataSource } from '../database';
import { GetCustomRepo } from '../repositories/GetCustomRepo';

interface ISettingsCreate {
    chat: boolean;
    username: string;
}

class SettingsService {
    private settingsRepository: Repository<Setting>;
    constructor() {
        this.settingsRepository =  GetCustomRepo(Setting, SettingsRepository, appDataSource)
    }

    async create({ chat, username } : ISettingsCreate) {

        //select *from settings where username = "username" limit 1;
        const userAlreadyExists = await this.settingsRepository.findOne(
        {
            where: {
                'username': username
            }
        });

        if (userAlreadyExists) {
            throw new Error("User already exists!");
        }
        
        const settings = this.settingsRepository.create({
         chat,
         username
        });

        await this.settingsRepository.save(settings);

        return settings;
    }

    async findByUsername (username: string) {
        const settings = await this.settingsRepository.findOne(
        {
            where: {
                'username': username
            }
        });
        return settings;
    }

    async update(username: string, chat: boolean) {
        await this.settingsRepository.createQueryBuilder().
        update(Setting)
        .set({ chat })
        .where ("username = :username", {
            username
        }).execute();
    }
}

export { SettingsService }