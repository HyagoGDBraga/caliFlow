import { UserRepository } from "../repository/userRepository";
import { UserDto, PartialUser, UserDtoResponseGet, UserDtoResponseCreate, UserDtoResponsePartial, UserDtoResponseUpdate, GetByIdResponse } from "../dto/UserDto";
import { missingFields } from "@/helpers/missing_fields";
import { User } from "../schema/userSchema";
import { AppError } from "@/decorators/Error.decorator";
import { assertAdmin } from "@/helpers";
import { Role } from "@/helpers";
import dataSource from "@/infra/database/datasource";
import { userKeys } from "@/infra/cache/redis/keys/user.key";
import { clientRedis } from "@/infra/cache";
import { incrementNumber } from "@/helpers/increment_number";
import { userWorker } from "@/infra/bullmq/workers/user.worker";
import { userQueue } from "@/infra/queue";
import { Bcrypt_service } from "@/infra/security/bcrypt/service/bcrypt.service";
export class UserService {
  private readonly userRepo: UserRepository;
  private readonly bcryptService: Bcrypt_service
  constructor(userRepo: UserRepository, bcryptService: Bcrypt_service) {
    this.userRepo = userRepo;
    this.bcryptService = bcryptService;
  }

  async getAllUser(
    role: Role,
    page: number,
    limit: number,
  ): Promise<UserDtoResponseGet> {
    try {
      if(role == Role.USER){
        assertAdmin(role);
      }
      const cache = await clientRedis.get(userKeys.all(page, limit));
      if (cache) {
        return JSON.parse(cache);
      }

      const user = await this.userRepo.getAllUser(page, limit);
      await clientRedis.set(
        userKeys.all(page, limit),
        JSON.stringify(`Usuário de número: ${incrementNumber(user)} \n` + user),
        "EX",
        60,
      );
      const response = {user: user}
      return response;
    } catch (err) {
      if (err instanceof Error) {
        throw err;
      }
      throw new AppError(
        `Não existem usuários cadastrados ou não foi possível encontrar`,
        404,
      );
    }
  }
  async createUser(data: UserDto): Promise<UserDtoResponseCreate> {
    try {
      missingFields(data, ["email", "name", "password", "role"]);
      const hash = await this.bcryptService.hashPassword(data.password);
      
      const userData = {
        ...data,
        password: hash
      }

      const user = await this.userRepo.createUser(userData);
      await clientRedis.set(
        userKeys.create(data),
        JSON.stringify(user),
        "EX",
        60,
      );
      await userQueue.add("email", {
        email: data.email,
      });
      const response = {user: user};
      return response;
      
    } catch (err) {
      if (err instanceof Error) {
        throw err;
      }
      throw new AppError("Não foi possível criar usuário", 500);
    }
  }

  async updateUser(
    data: UserDto,
    id: string,
    role: Role,
  ): Promise<GetByIdResponse> {
    try {
      if (!data) {
        throw new AppError(`Campos faltando`, 500);
      }
      if (!id) {
        throw new AppError(`id faltando`, 500);
      }
      if (role == Role.USER) {
        assertAdmin(role);
      }
      missingFields(data, ["email", "name", "password", "role"]);
      const hash = await this.bcryptService.hashPassword(data.password);
      const userDataUpdated = {
        ...data,
        password: hash
      }
      await this.userRepo.updateUser(userDataUpdated, id);
      const user = await this.getUserById(id, role);
    
      await clientRedis.set(userKeys.byId(id), JSON.stringify(user), "EX", 60);
      const key = await clientRedis.keys("users:*");
      if (key != null && key.length > 0) {
        await clientRedis.del(...key);
      }
       return user;
    } catch (err) {
      if (err instanceof Error) {
        throw err;
      }
      throw new AppError("Não foi possível atualizar o usuário", 500);
    }
  }

  async getUserById(id: string, role: Role): Promise<GetByIdResponse> {
    try {
      if (role == Role.USER) {
        assertAdmin(role);
      }
      if (!id) {
        throw new AppError(`ID faltando`, 400);
      }
      const cache = await clientRedis.get(userKeys.byId(id));
      if (cache) {
        return JSON.parse(cache);
      }
      const user = await this.userRepo.getUserById(id);
      if(!user){
        throw new AppError(`Null`, 400);
      }
      await clientRedis.set(userKeys.byId(id), JSON.stringify(user), "EX", 60);

      console.log(`User achado: ${user}`);
      const response = {user: user};
      return response;
    } catch (err) {
      if (err instanceof Error) {
        throw err;
      }
    }
    throw new AppError(`Usuário não encontrado`, 404);
  }

  async deletUser(id: string, role: Role): Promise<void> {
    if (role === Role.USER) {
      assertAdmin(role);
    }
    if (!id) {
      throw new AppError(`Id faltando, forneça o id!`, 400);
    }
    await this.userRepo.deleteUser(id);
  }
  async getUserByEmail(email: string): Promise<User | null> {
    try {
      const user = await dataSource.getRepository(User);
      const u_email = await user.findOne({ where: { email } });
      return u_email;
    } catch (err) {
      if (err instanceof Error) {
        throw err;
      }
    }
    throw new AppError(`Usuário não encontrado`, 404);
  }
}
