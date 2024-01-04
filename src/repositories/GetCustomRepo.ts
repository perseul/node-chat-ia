import { DataSource, EntityTarget, Repository } from "typeorm";

export function GetCustomRepo<T, K extends typeof Repository<T>>(
    entity: EntityTarget<T>, Cls: K, db: DataSource) {
       return new Cls(entity, db.getRepository(entity).manager) as InstanceType<K>;
    } 
