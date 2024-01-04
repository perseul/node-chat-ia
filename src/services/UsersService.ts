import { Repository } from "typeorm";
import { User } from "../entities/User";
import { UsersRepository } from "../repositories/UsersRepository";
import { appDataSource } from "../database";
import { GetCustomRepo } from "../repositories/GetCustomRepo";

class UsersService {
    private usersRepository: Repository<User>

    constructor() {
      this.usersRepository = GetCustomRepo(User, UsersRepository, appDataSource)
    }
    async create(email: string) {      
      const userExists = await this.usersRepository.findOne(
      {
        where: {
          'email': email
        }
      });

      if(userExists){
          return userExists;
      }

      const user = this.usersRepository.create ({
          email
      });

      await this.usersRepository.save(user);
        
      return user;
        
    }
    
    async findByEmail(email: string) {
      const user = await this.usersRepository.findOne(
        { 
          where: {
            'email': email
          }
        });
  
      return user;
    }
}

export { UsersService };