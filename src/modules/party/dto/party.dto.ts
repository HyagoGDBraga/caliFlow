import { User } from "@/modules/user/schema/userSchema";

export type PartyDto = {
  id?: string;
  name: string;
  description: string;
  maxMembers: number;
  isOpen: boolean;
  createdAt: Date;
  users: User[];
};

type PartyDtoResponse = {
  party: PartyDto;
};
export type PartyDtoResponseGetById = PartyDtoResponse;
export type PartyDtoResponseUpdate = PartyDtoResponse;
export type PartyDtoResponseCreate = PartyDtoResponse;
