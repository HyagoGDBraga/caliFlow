import { Worker, Job } from "bullmq";
import { connection } from "../bullMq";

export const Client_IA_Worker = new Worker(
  "Client_IA",
  async (job: Job) => {
    try {
      console.log(`Processando job ${job.id}`);
      console.log("Dados:", job.data);

      return {
        success: true,
        processedAt: new Date(),
      };
    } catch (error) {
      console.error("Erro ao processar job:", error);
      throw error;
    }
  },
  {
    connection,
    concurrency: 5, // opcional
  }
);

// Quando um job termina
Client_IA_Worker.on("completed", (job, result) => {
  console.log(`✅ Job ${job.id} concluído`);
  console.log("Resultado:", result);
});

// Quando um job falha
Client_IA_Worker.on("failed", (job, err) => {
  console.error(`❌ Job ${job?.id} falhou`);
  console.error(err.message);
});

// Quando ocorre erro no worker
Client_IA_Worker.on("error", (err) => {
  console.error("🚨 Erro no Worker:", err);
});

// Quando o worker fica pronto
Client_IA_Worker.on("ready", () => {
  console.log("🚀 Worker Client_IA iniciado");
});

// Quando fecha a conexão
Client_IA_Worker.on("closed", () => {
  console.log("🔒 Worker encerrado");
});