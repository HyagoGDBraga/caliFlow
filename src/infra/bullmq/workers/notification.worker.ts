import { Worker } from "bullmq";
import { AppError } from "@/decorators/Error.decorator";
import { connection } from "../index";

const notificationWorker = new Worker("notification", async (job) => {
  (console.log(`Job: ${job.data}`),
    {
      connection,
    });
});

notificationWorker.on(`completed`, (job) => {
  console.log(`Job completado: ${job.id}`);
});

notificationWorker.on("failed", (job, error) => {
  if (!job) {
    console.error(new AppError("Por favor, forneça o job"));
    return;
  }
  console.error(`Job falhou: ${job.id} - ${error.message}`);
});

notificationWorker.on("progress", (job) => {
  if (!job) {
    console.error(new AppError("Por favor, forneça o job"));
    return;
  }
  console.log(`o Job ta em progresso: ${job.id}`);
});
