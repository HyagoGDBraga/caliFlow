import { Worker } from "bullmq";
import { AppError } from "@/decorators/Error.decorator";
import {connection} from '../index';

export const userWorker = new Worker(
  'user',
  async (job) => {
    console.log(`${job.data}`);
  },
  { connection },
);

userWorker.on(`completed`, (job) => {
  console.log(`Job completado: ${job.id}`);
});

userWorker.on("failed", (job, error) => {
  if (!job) {
  console.error(new AppError("Por favor, forneça o job"));
  return;
  }
  console.error(`Job falhou: ${job.id} - ${error.message}`);
});
