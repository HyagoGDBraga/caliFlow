
export const to_string = (object: unknown): string=>{
    try{
        if(object == undefined){
            throw new Error(`O objeto é undefined`)
        }
        return String(object);

    }catch(err){
        if(err instanceof Error){
            throw new Error(err.message);
        }
        throw new Error(`Undefined`)
    }
}


