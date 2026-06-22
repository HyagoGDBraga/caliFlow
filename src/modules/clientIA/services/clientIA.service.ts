import {
  CreateClientIADTO,
  CreateClientIAResponseDTO,
  DeleteClientIAResponseDTO,
  GetClientIAByIdResponseDTO,
  GetClientIAResponseDTO,
  UpdateClientIADTO,
  UpdateClientIAResponseDTO,
  ClientIA,
} from "./../dto/clientIA.dto";
import { ClientIARepostiroy } from "./../repository/ClientIA.repository";
import { AppError } from "@/decorators/Error.decorator";
import { ClientIA_Queue } from "@/infra/queue/clientIA.queue";
import { clientRedis } from "@/infra/cache";
import { assertAdmin, MessageRole } from "@/helpers";
import { Role } from "@/helpers";
import { missingFields } from "@/helpers/missing_fields";
import { clientIAkeys } from "@/infra/cache/redis/keys/clientIA.keys";
import { clientGROQ_gpt } from "@/infra/clientIA/groq/groq.openIaLib";
export class Client_IA_Service {
  constructor(private readonly clientIa_repo: ClientIARepostiroy) {}

  async create(data: CreateClientIADTO): Promise<CreateClientIAResponseDTO> {
    try {
      if (!data) {
        missingFields(data, ["message", "messageType", "user"]);
      }
      const client_ia = await this.clientIa_repo.create(data);
      if (!client_ia) {
        throw new AppError(`Não foi possível criar o client_ia`, 400);
      }
      await clientRedis.set(
        clientIAkeys.create(data),
        JSON.stringify(client_ia),
        "EX",
        60,
      );
      await ClientIA_Queue.add("message", {
        message: data.message,
      });

      const response = { clientIA: client_ia };
      return response;
    } catch (err) {
      if (err instanceof Error) {
        throw err;
      }
      throw new AppError(`Não foi possível criar a conversa do IAclient`, 400);
    }
  }

  async sendMessage(conversationId: string, message: string): Promise<any> {
    try {
      if (!conversationId) {
        throw new AppError(`Forneça o id`, 400);
      }
      if (!message) {
        throw new AppError(`Forneça a mensagem`, 400);
      }
      const history =
        (await this.clientIa_repo.findMessagesByConversationId(
          conversationId,
        )) ?? [];
      const messages: Array<{
        role: "user" | "assistant";
        content: string;
      }> = history.map((msg) => ({
        role: msg.message_type === MessageRole.USER ? "user" : "assistant",
        content: msg.message,
      }));

      messages.push({
        role: "user",
        content: message,
      });

      const response = await clientGROQ_gpt.chat.completions.create({
        model: "openai/gpt-oss-20b",
        messages,
      });

      const choice = response.choices?.[0];

      if (!choice?.message?.content) {
        throw new AppError("Resposta da IA inválida", 500);
      }

      return choice.message.content;
    } catch (err) {
      if (err instanceof Error) {
        throw err;
      }
      throw new AppError(`Não foi possível criar a conversa do IAclient`, 400);
    }
  }
  
}
