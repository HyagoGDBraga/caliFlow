import { QueueEvents } from "bullmq";

const userQueueEvent = new QueueEvents('users');

userQueueEvent.on('waiting', ({jobId}, timestamp)=>{
    console.log(`Esperando na fila: ${jobId} em ${timestamp}`);
})


userQueueEvent.on('active', ({ jobId, prev }, timestamp)=>{
    console.log(`job em fila ativa: ${jobId}, \n Anterior: ${prev} em ${timestamp}`);
})

userQueueEvent.on('progress', ({jobId, data}, timestamp)=>{
    console.log(`${jobId} progresso: ${data}, em: ${timestamp}`);
})


