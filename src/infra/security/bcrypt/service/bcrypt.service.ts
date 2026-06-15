import bcrypt from 'bcryptjs'
import { AppError } from '@/decorators/Error.decorator';

export class Bcrypt_service {
    async genSalt(): Promise<string>{
        try{
            const salt = await bcrypt.genSalt(10);
            return salt;
        }catch(err){
            if(err instanceof Error){
                throw err;
            }
            throw new AppError("Erro ao gerar o salt", 500);
        }
    }

    async hashPassword(password: string):Promise<string>{
        try{
            let salt = await this.genSalt();
                
                let hash = await bcrypt.hash(password, salt);
                return hash
        }catch(err){
        if(err instanceof Error){
                throw err;
            }
            throw new AppError("Erro ao gerar o hash de senha", 500);
        }
    }
}
