import { Injectable } from '@nestjs/common';
import { of } from 'rxjs';
import { getRepository } from 'typeorm';
@Injectable()
export class ApiValidateServer {
  // constructor() {}
  errorType(value, type: string) {
    if (typeof value !== type) return true;
    else return false;
  }
  errorUndefined(value) {
    if (value === undefined || value.length === 0 || value === "") return true;
    else return false;
  }
  errorUndefinedDelete(error) {
    for (const key in error) {
      if (error[key] === undefined) delete error[key];
    }
    return error;
  }
  errorObjectNull(object) {
    if (Object.keys(object).length !== 0) return true; else return false;
  }
  errorLenghtMin(value, min:number ){
    if(value.length < min) return true; else return false;
  }
  errorLenghtMax(value, max:number ){
    if(value.length > max) return true; else return false;
  }
  async errorUnique(table, value, nameColumn: string, id?: number) {
    const check = await table.findOne({
      where: { [nameColumn]: value },
    });
    if (id !== undefined && check !== undefined) {
      return check.id !== id;
    }
    if (check !== undefined) return true;
    else return false;
  }
  errorMinMax(min: number, max: number) {
    if (min > max) return true;
    else return false;
  }
  async errorGetRepositoryId(RepositoryName: string, value) {
    const Repository = getRepository(RepositoryName);
    if ((await Repository.findOne(value)) === undefined) return true;
    else return false;
  }
}
