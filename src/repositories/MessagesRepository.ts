import { Repository } from "typeorm";
import { Message } from '../entities/Message';

class MessagesRepository extends Repository<Message> {}

export { MessagesRepository };