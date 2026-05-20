import dataSource from "./datasource";

export const connectDataBase = async()=>{
    try{
        if(!dataSource.isInitialized){
         await dataSource.initialize();
         console.log(`Banco conectou papai!`)       
        }
    }catch(err){
        if(err instanceof Error){
            throw err;
        }
    }

    
}
export const disconnectDataBase = async()=>{
    try{
        if(dataSource.isInitialized){
            await dataSource.destroy();
            console.log(`Banco desconectou papai!`)  
        }
    }catch(err){
          if(err instanceof Error){
            throw err;
        }
    }
}