import { ClientIA } from "../schema/ClientIa.schema";
import dataSource from "@/infra/database/datasource";
import { pagination } from "@/helpers";
export class ClientIARepostiroy{
    private readonly repo =  dataSource.getRepository(ClientIA);

    async create(data: Partial<ClientIA>): Promise<ClientIA | null>{
        const clientCreate = await this.repo.create(data);
        return await this.repo.save(clientCreate);
    }

    async getByID(id: string): Promise<ClientIA | null>{
        const clientIAbyId = await this.repo.findOne({where: {id}});
        return clientIAbyId;
    }

    async deleteById(id: string): Promise<void>{
        await this.repo.delete(id);
    }

    async patch(data: Partial<ClientIA>, id: string):Promise<ClientIA | null>{
        const clientIA = await this.getByID(id);
        if(!clientIA) return null;
        const update = Object.assign(clientIA, data);
        return await this.repo.save(update);        
    }

    async update(data: ClientIA, id: string): Promise<ClientIA | null>{
        const clientIA = await this.getByID(id);
        if(!clientIA) return null;
        const update = Object.assign(clientIA, data);
        return await this.repo.save(update);
    }
    async getAll(page: number, limit: number):Promise<ClientIA[]> {
        const allClientIA = await this.repo.find({take: page, skip: limit});
        return allClientIA;
    }
    
}