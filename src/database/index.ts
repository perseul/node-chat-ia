import { DataSource } from 'typeorm';
import { Connection } from '../entities/Connection';
import { Message } from '../entities/Message';
import { Setting } from '../entities/Setting';
import { User } from '../entities/User';


export const appDataSource = new DataSource({
    type: "sqlite",
    database: "./src/database/database.sqlite",
    entities: [Connection,
               Message,
               Setting,
               User]
});
 
const main = async () => {
    console.time('main');
    await appDataSource.initialize();
};
 
main().catch(err => {
    console.error(err);
    process.exit(1);
});