import { Role } from "@/helpers/role.helper";
import { User } from "../schema/userSchema";

export type UserDto = {
    id: string;
    name: string;
    bio?: string,
    email: string;
    password: string;
    friends?: User[]
    role: Role;
};

export type PartialUser = {
    user?: UserDto;
};

