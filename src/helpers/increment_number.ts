
export function incrementNumber(object: any): number {
    let number: number = 0;
      for(let i = 0; i < object.length; i++){
          number += 1;
      }
      return number;
    }