import { QueueEvents } from "bullmq";

const notificationQueue = new QueueEvents('notification');

notificationQueue.on(`active`, ({jobId, prev}, timestamp)=>{
    console.log(`A tarefa está ativa: ${jobId} em ${timestamp}.  \n Anterior: ${prev}`);
});





