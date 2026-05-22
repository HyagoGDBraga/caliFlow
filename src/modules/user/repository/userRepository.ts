import { User } from "../schema/userSchema";
import dataSource from "@/infra/database/datasource";
import { pagination } from "@/helpers";
import { AppError } from "@/decorators/Error.decorator";
export class UserRepository {
  private repository = dataSource.getRepository(User);

  async createUser(data: Partial<User>): Promise<User> {
    const user = await this.repository.create(data);
    return this.repository.save(user);
  }

  async getAllUser(skip: number, take: number): Promise<User[]> {
    const user = await this.repository.find(pagination(skip, take));
    return user;
  }

async updateUser(updateData: Partial<User>, id: string): Promise<User | null> {
  const user = await this.getUserById(id);

  if (!user) return null;

  Object.assign(user, updateData);

  return this.repository.save(user);
}
  async patchUser(patchData: Partial<User>, id: string): Promise<User | null> {
  const user = await this.getUserById(id);

  if (!user) return null;

  Object.assign(user, patchData);

  return this.repository.save(user);
}
  async deleteUser(id: string): Promise<void> {
    await this.repository.delete({ id });
  }

  async getUserById(id: string): Promise<User | null > {
    const user = await this.repository.findOne({ where: { id } });
    return user;
  }
}
