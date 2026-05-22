import dataSource from "@/infra/database/datasource";
import { Notification } from "../schema/Notification.schema";
export class NotificationRepository {
  private repo = dataSource.getRepository(Notification);

  async create(data: Partial<Notification>) {
    const notification = this.repo.create(data);
    return this.repo.save(notification);
  }

  async getById(id: string): Promise<Notification | null> {
    return await this.repo.findOne({ where: { id } });
  }

  async getAll(page: number, limit: number): Promise<Notification[]> {
    return await this.repo.find({ skip: page, take: limit });
  }

  async updateById(
    id: string,
    data: Notification,
  ): Promise<Notification | null> {
    await this.repo.update({ id }, data);
    return await this.getById(id);
  }

  async deleteById(id: string): Promise<void> {}

  async patch(
    id: string,
    data: Partial<Notification>,
  ): Promise<Notification | null> {
    await this.repo.update({ id }, data);
    return await this.getById(id);
  }
}
