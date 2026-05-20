import { Role } from "./role.helper"
export const assertAdmin = (role: Role) => {
    if(role !== Role.ADMIN){
        throw new Error(`Usuário não é um admin!`);
    }
}