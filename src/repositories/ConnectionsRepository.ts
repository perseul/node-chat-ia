import { Repository } from 'typeorm';
import { Connection } from '../entities/Connection';

class ConnectionsRepository extends Repository<Connection> {}

export { ConnectionsRepository };