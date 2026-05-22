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

  async updateUser(updateData: User, id: string): Promise<User | null> {
    await this.repository.update({ id }, updateData);
    const user = await this.getUserById(id);
    return user;
  }

  async patchUser(patchData: Partial<User>, id: string): Promise<User | null> {
    await this.repository.update({ id }, patchData);
    const user = await this.getUserById(id);
    return user;
  }
  async deleteUser(id: string): Promise<void> {
    await this.repository.delete({ id });
  }

  async getUserById(id: string): Promise<User | null > {
    const user = await this.repository.findOne({ where: { id } });
    return user;
  }
}
