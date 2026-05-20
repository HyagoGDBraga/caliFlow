import Redis from "ioredis";
import { envalid } from "@/env/envalid";

const host = envalid.REDIS_HOST;
const port = envalid.REDIS_PORT;

export const clientRedis = new Redis({
  host: host,
  port: port,
});

clientRedis.on('connect', ()=>{
    console.log(`Cliente conectado!`)
});

clientRedis.on("error", (error: Error)=>{
    console.log(`cliente com problema ${error.message}`)
});

