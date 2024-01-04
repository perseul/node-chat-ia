import { Repository } from "typeorm";
import { Message } from '../entities/Message';
import { MessagesRepository } from "../repositories/MessagesRepository";
import { appDataSource } from "../database";
import { GetCustomRepo } from "../repositories/GetCustomRepo";

interface IMessageCreate {
    admin_id?: string;
    text: string;
    user_id: string;
}

class MessagesService {
    private messagesRepository: Repository<Message>;

    constructor() {
        this.messagesRepository = GetCustomRepo(Message, MessagesRepository, appDataSource)
    }
    
    async create( { admin_id, text, user_id }: IMessageCreate) {
        const message = this.messagesRepository.create({
            admin_id,
            text,
            user_id,
        });

        await this.messagesRepository.save(message);

        return message;
    }

    async ListByUser(user_id: string) {
      const list = await this.messagesRepository.find({
          where: { user_id },
          relations: ["user"],
      });

      return list;
    }
}

export { MessagesService };