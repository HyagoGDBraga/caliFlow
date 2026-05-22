import { NotificationRepository } from "../repository/notification.repository";
import { missingFields } from "@/helpers/missing_fields";
import { AppError } from "@/decorators/Error.decorator";
import { assertAdmin, Role } from "@/helpers";
import {
  notificationDto,
  notificationResponseCreate,
  notificationResponseGet,
  notificationResponseGetById,
  notificationResponsePatch,
  notificationResponseUpdate,
} from "../dto/notification.dto";
import { notificationKey } from "@/infra/cache/redis/keys/notification.key";
import { notificationQueue } from "@/infra/queue/notification.queue";
import { clientRedis } from "@/infra/cache";
export class NotificationService {
  private notificationRepository: NotificationRepository;
  constructor(notificationRepository: NotificationRepository) {
    this.notificationRepository = notificationRepository;
  }

  async createNotification(
    data: notificationDto,
  ): Promise<notificationResponseCreate> {
    try {
      if (!data) {
        throw new AppError(`Forneça os campos necessários`, 400);
      }
      missingFields(data, ["user_email", "message"]);
      const notification = await this.notificationRepository.create(data);
      await clientRedis.set(
        notificationKey.create(data),
        JSON.stringify(notification),
        "EX",
        60,
      );
      await notificationQueue.add("notification", {
        message: data.message,
      });
      const response = { notification: notification };
      return response;
    } catch (err) {
      if (err instanceof Error) {
        throw err;
      }
      throw new AppError(`Erro ao criar a notificação`, 400);
    }
  }

  async getAll(
    page: number,
    limit: number,
    role: Role,
  ): Promise<notificationResponseGet> {
    try {
      if (role == Role.USER) {
        assertAdmin(role);
      }
      const notif = await this.notificationRepository.getAll(page, limit);
      const cache = await clientRedis.get(notificationKey.all(page, limit));
      if (cache) {
        JSON.parse(cache);
      }
      await clientRedis.set(
        notificationKey.all(page, limit),
        JSON.stringify(notif),
        "EX",
        60,
      );
      const response = { notification: notif };
      return response;
    } catch (err) {
      if (err instanceof Error) {
        throw err;
      }
      throw new AppError(`Não foi possível achar as notificações`, 404);
    }
  }

  async updateNotification(
    id: string,
    data: notificationDto,
    role: Role,
  ): Promise<notificationResponseUpdate> {
    try {
      if (role === Role.USER) {
        assertAdmin(role);
      }
      if (!data) {
        throw new AppError(`Por favor, forneça os campos necessários`);
      }
      missingFields(data, ["user_email", "message"]);
      await this.notificationRepository.updateById(id, data);
      const updt = await this.notificationRepository.getById(id);
      if(!updt){
        throw new AppError(`Null`, 400);
      }
      await clientRedis.set(
        notificationKey.update(id, data),
        JSON.stringify(updt),
        "EX",
        60,
      );
      const key = await clientRedis.keys("notification:*");
      if (key !== undefined && key.length > 0) {
        clientRedis.del(...key);
      }

      const response = { notification: updt };
    
      return response;
    } catch (err) {
      if (err instanceof Error) {
        throw err;
      }
      throw new AppError(`Não foi possível atualizar o usuário`, 400);
    }
  }
}
