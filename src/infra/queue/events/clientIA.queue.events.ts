import { QueueEvents } from "bullmq";

export const clientIAQueueEvents = new QueueEvents("Client-IA");

clientIAQueueEvents.on("active", ({ jobId, prev }) => {
  console.log(`🚀 Job ${jobId} iniciou. Estado anterior: ${prev}`);
});

clientIAQueueEvents.on("completed", ({ jobId, returnvalue }) => {
  console.log(`✅ Job ${jobId} concluído.`);
  console.log("Retorno:", returnvalue);
});

clientIAQueueEvents.on("failed", ({ jobId, failedReason }) => {
  console.error(`❌ Job ${jobId} falhou.`);
  console.error("Motivo:", failedReason);
});

clientIAQueueEvents.on("progress", ({ jobId, data }) => {
  console.log(`📊 Job ${jobId} progresso:`, data);
});

clientIAQueueEvents.on("waiting", ({ jobId }) => {
  console.log(`⏳ Job ${jobId} aguardando processamento.`);
});

clientIAQueueEvents.on("delayed", ({ jobId, delay }) => {
  console.log(`🕒 Job ${jobId} atrasado por ${delay}ms.`);
});

clientIAQueueEvents.on("stalled", ({ jobId }) => {
  console.warn(`⚠️ Job ${jobId} travou (stalled).`);
});

clientIAQueueEvents.on("removed", ({ jobId }) => {
  console.log(`🗑️ Job ${jobId} removido.`);
});

clientIAQueueEvents.on("drained", () => {
  console.log("📭 Fila vazia.");
});

clientIAQueueEvents.on("error", (err) => {
  console.error("🔥 Erro no QueueEvents:", err);
});