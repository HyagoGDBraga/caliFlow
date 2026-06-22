import { Worker, Job } from "bullmq";
import { connection } from "../bullMq";
const chatMessageWorker = new Worker("chatmessage", async (job: Job)=>{
console.log(`Id do worker job: ${job.id}`)
    console.log(`Worker rodando: ${job.data}`); 
},{
    connection
});

chatMessageWorker.on("active", (job) => {
  console.log(`Job ${job.id} iniciado`);
});

chatMessageWorker.on("completed", (job) => {
  console.log(`Job ${job.id} concluído`);
});

chatMessageWorker.on("failed", (job, err) => {
  console.log(`Job ${job?.id} falhou`);
  console.error(err);
});
