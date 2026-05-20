import express, { Request, Response } from "express";
import cors, { CorsOptions } from "cors";
import { envalid } from "@/env/envalid";
import { connectDataBase, disconnectDataBase } from "../database";

const app = express();
export const port = envalid.PORT || 5000;
const domains = envalid.ALLOWED_DOMAINS;

const corsOptions: CorsOptions = {
    origin: (origin, callback)=>{
        if(!origin){
            return callback(null, true);
        }
        if(domains.includes(origin)){
            return callback(null, true)
        }
        return callback(new Error(" Não permitido pelo cors, amiguinho!"), false)
    },

  credentials: true, // se usar cookie/jwt via cookie
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
}


app.use(cors(corsOptions));

    function database(){
        connectDataBase().then((result)=>{
        console.log(`Banco de dados funcionando ${result}`)
    }).catch((err)=>{
        console.log(`Banco de dados não está funcionando`)
        throw err;
    })
}

database();
app.get("/health", (req: Request, res: Response)=>{
    try{
        console.log(`Servidor rodando`)
        return res.json({
            message: `Servidor rodando na porta ${port}`
        });
    }catch(err){
        if(err instanceof Error){
            throw err;
        }
    }
})

export default app;
