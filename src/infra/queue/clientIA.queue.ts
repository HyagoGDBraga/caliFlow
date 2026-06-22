import { Queue } from "bullmq";
import { connection } from "../bullmq";
export const ClientIA_Queue = new Queue("Client-IA", 
    {connection})