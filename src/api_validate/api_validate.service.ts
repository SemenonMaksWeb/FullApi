import { Injectable } from '@nestjs/common';
@Injectable()
export class ApiValidateServer {
  constructor() {}
  errorType(value, type:string){
    if(typeof value !== type)
      return true;
    else 
      return false;
  
  }
  errorUndefined(value){
    if(value === undefined)
      return true;
    else 
      return false;
    
  }
  errorUndefinedDelete(error:object){
    for (const key in error){
      if(error[key] === undefined)
        delete(error[key]);
    }
    return error;
  }
  errorObjectNull(object: object){
    if(Object.keys(object).length !== 0)
      return true;
    else 
      return false;
  } 
  async errorUnique(table, value, nameColumn: string){
    let check  = await table.findOne({
      where: {[nameColumn]: value}
    })
    if(check !== undefined)
      return true
    else
      return false;
  }
}
 