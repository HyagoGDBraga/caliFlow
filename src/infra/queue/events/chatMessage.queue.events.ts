import { QueueEvents } from "bullmq";

const chatMessageEvents = new QueueEvents("chat-message");

chatMessageEvents.on("active", ({jobId,prev}, timestamp)=>{
    console.log(`Está ativa: ${jobId}, anterior: ${prev}, em: ${timestamp}`);
});




