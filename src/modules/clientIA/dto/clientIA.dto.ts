import { MessageRole } from "@/helpers";
import { User } from "@/modules/user/schema/userSchema";

export interface ClientIA {
  id: string;
  message: string;
  createdAt: Date;
  message_type: MessageRole;
  user: User;
}

export interface CreateClientIADTO {
  message: string;
  message_type: MessageRole;
  userId: string;
}

export interface CreateClientIAResponseDTO {
  clientIA: ClientIA;
}

export interface GetClientIAResponseDTO {
  clientIA: ClientIA[];
}

export interface GetClientIAByIdResponseDTO {
  clientIA: ClientIA;
}

export interface DeleteClientIAResponseDTO {
  success: boolean;
}

export interface UpdateClientIADTO {
  message?: string;
  messageType?: MessageRole;
}

export interface UpdateClientIAResponseDTO {
  clientIA: ClientIA;
}