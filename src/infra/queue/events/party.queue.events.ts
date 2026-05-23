import { QueueEvents } from "bullmq";

export const partyQueue = new QueueEvents("party");

partyQueue.on("waiting", ({ jobId }, timestamp) => {
  console.log(
    `[PARTY_QUEUE] Job esperando: ${jobId} em ${new Date(timestamp).toISOString()}`
  );
});

partyQueue.on("active", ({ jobId }, timestamp) => {
  console.log(
    `[PARTY_QUEUE] Job ativo: ${jobId} em ${new Date(timestamp).toISOString()}`
  );
});

partyQueue.on("completed", ({ jobId, returnvalue }, timestamp) => {
  console.log(
    `[PARTY_QUEUE] Job concluído: ${jobId} em ${new Date(timestamp).toISOString()}`
  );

  console.log("Resultado:", returnvalue);
});

partyQueue.on("failed", ({ jobId, failedReason }, timestamp) => {
  console.error(
    `[PARTY_QUEUE] Job falhou: ${jobId} em ${new Date(timestamp).toISOString()}`
  );

  console.error("Motivo:", failedReason);
});

partyQueue.on("progress", ({ jobId, data }, timestamp) => {
  console.log(
    `[PARTY_QUEUE] Progresso do job ${jobId}:`,
    data
  );
});

partyQueue.on("paused", () => {
  console.warn("[PARTY_QUEUE] Queue pausada");
});

partyQueue.on("resumed", () => {
  console.log("[PARTY_QUEUE] Queue retomada");
});

partyQueue.on("stalled", ({ jobId }) => {
  console.warn(`[PARTY_QUEUE] Job travado: ${jobId}`);
});

partyQueue.on("error", (err) => {
  console.error("[PARTY_QUEUE] Erro na queue:", err);
});