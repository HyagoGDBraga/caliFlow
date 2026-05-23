import { Queue } from "bullmq";
import { connection } from "@/infra/bullmq";

export const notificationQueue = new Queue("party", {
  connection,
});
