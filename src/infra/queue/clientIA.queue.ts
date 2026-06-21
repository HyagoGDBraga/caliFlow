import { Queue } from "bullmq";
import { connection } from "../bullmq";
export const ClientIA = new Queue("Client-IA", 
    {connection})