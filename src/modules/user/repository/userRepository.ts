import { User } from "../schema/userSchema";
import dataSource from "@/infra/database/datasource";
import { pagination } from "@/helpers";
import { AppError } from "@/decorators/Error.decorator";
export class UserRepository {
     private repository = dataSource.getRepository(User);
    
  async createUser(data: User ): Promise<User>{
    if(!data){
        throw new AppError(`Conteúdo faltando! por favor, insira o corpo`, 400);
    }
    const user = await this.repository.create(data);
    return this.repository.save(user);
}


async getAllUser(skip: number, take: number): Promise<User[]>{
    const user = await this.repository.find(pagination(skip, take));
    if(user.length == 0){
        throw new AppError(`Não existem usuários cadastrados`, 404);
    }
    return user;
}



async updateUser(updateData: User, id: string): Promise<User>{
     if(!updateData){
        throw new AppError(`Conteúdo faltando! por favor, insira o corpo`, 400);
    }
    if(!id || id == null){
        throw new AppError(`Por favor, forneça um id válido`, 400);
    }

    await this.repository.update({id}, updateData);
    const user = await this.getUserById(id);
    return user;
}

async patchUser(patchData: Partial<User>, id: string): Promise<User>{
    if(!patchData || null){
        throw new Error(`Corpo faltando!`);
    }
      if(!id || null){
        throw new AppError(`Id faltando, por favor, forneça`, 400)
    }
    await this.repository.update({id}, patchData);
    const user = await this.getUserById(id);
    return user;
}
async deleteUser(id: string): Promise<void> {
    if(!id){
        throw new AppError("forneça o id", 400);
    }
    await this.repository.delete({id});
}

async getUserById(id: string): Promise<User>{
    if(!id){
            throw new AppError(`Por favor, forneça um id válido`, 400);
    }
    const user = await this.repository.findOne({where: {id}});
    if(!user){
        throw new Error(`Não existe usuário`);
    } 
    
    return user;
}
}

