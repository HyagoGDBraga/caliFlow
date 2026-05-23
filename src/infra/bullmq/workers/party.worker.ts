import { Worker } from "bullmq";
import { connection } from "../bullMq";
import { AppError } from "@/decorators/Error.decorator";
export const partyWorker = new Worker('party', async(job)=>{
    console.log(`Worker party rodando: ${job.data}`, {
        connection
    })
});

partyWorker.on('active', (job)=>{
    console.log(`Worker ativo: ${job.data}`);
})

partyWorker.on('failed', (job, error)=>{
    if(!job){
        throw new AppError(`forneça o job`, 400)
    }
    console.error(`Worker falhou: ${job} - ${error}`);
})