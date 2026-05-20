import { Role } from "@/helpers/role.helper";
import { User } from "../schema/userSchema";
import { Notification } from "@/modules/notification/schema/Notification.schema";

export type UserDto = {
    id: string;
    name: string;
    bio?: string,
    email: string;
    password: string;
    friends?: User[]
    notification?: Notification;
    role: Role;
};

export type UserDtoResponseGet = {
   user: UserDto[];
}

export type UserDtoResponseCreate = {
    user: UserDto;
}

export type UserDtoResponseUpdate = {
    user: UserDto;
}

export type UserDtoResponsePartial = {
    user?: UserDto;
}

export type GetByIdResponse = {
  user: UserDto;
};



export type PartialUser = {
    user?: UserDto;
};

