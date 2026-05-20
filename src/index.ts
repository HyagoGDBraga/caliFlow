import app from "./infra/http";
import { port } from "./infra/http";

app.listen(port, ()=>{
    try{
        console.log(`Servidor rodando na porta ${port}`);
    }catch(err){
        if(err instanceof Error){
            throw err;
        }
    }
});

export default app;