import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { check } from 'prettier';
import { Like, Repository } from 'typeorm';
import { Сompany } from './company.entity';
import { CreateCompanyDto } from "./dto/create-company.dto"
@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Сompany)
    private readonly CompanyRepository: Repository<Сompany>,
  ) {}

  async create(CreateCompanyDto: CreateCompanyDto){
    const check = await this.ValidAll(CreateCompanyDto);
    console.log(check);
    if(check === undefined){
      return await this.CompanyRepository.save(CreateCompanyDto);
    }else{
      return check
    }
  }
  async update(id: string, body:CreateCompanyDto){
    const check = await this.ValidName(body.name);
    if(check === undefined){
      let data = await this.CompanyRepository.update(id, body);
      let meta = this.setMetaUpdate(data.affected, id);
      return meta;
    }else if(check !== undefined){
      return check
    } 
  }
  findAll(search: string, page: string){
    if(search === undefined){
      return this.CompanyRepository.find();
    }else{
      return this.findLike(search);
    }
  }
  async findLike(nameQuery){
    return await this.CompanyRepository.find({
      name: Like(`${nameQuery}%`) 
    });
  }
  findOne(id: string) {
    return this.CompanyRepository.findOne(id);
  }
  async remove(id: string) {
    return await this.CompanyRepository.delete(id);
  }
  setMetaGet(response, errorMessage: string){
    if(response === undefined || response.length === 0){
      return {
        error: errorMessage,
        status: 404
      }
    }else{
      return {
        status: 200,
      }
    }
  }
  setMetaDelete(response, errorMessage: string){
    if(response.affected === 0){ //  Количество удаленных записей
      return {
        text: errorMessage,
        status: 404
      }
    }else{
      return {
        status: 200,
        text: "Запись удачно удалена",
      }
    }
  }
  setMetaUpdate(response: number , id: string){
    let meta = {};
    if(response === 0){
      meta["status"] = 404;
      meta["text"] = `Компания с ${id} не найден`
      return meta;
    }else if(response === 1){
      meta["status"] = 200;
      meta["text"] = `Запись c id ${id} Успешно измененна`
      return meta;
    }
  }
  ValidCheckUndefined(value){
    if(value !== undefined){
      return true;
    }
    else{
      return false;
    }
  }
  ValidCheckType(value, type: string){
    if(typeof value === type ){
      return true;
    }
    else{
      return false;
    }
  }
  async ValidCheckValueUnique(value, nameColumn: string){
    let check  = await this.CompanyRepository.findOne({
      where: {[nameColumn]: value}
    })
    if(check !== undefined){
      return true
    } 
    else{
       return false;
    }
  }
  async ValidAll(body){
    let error = {};
    error["name"] = await this.ValidName(body.name);
    error["address"] = await this.ValidAddress(body.address);
    for (const key in error) {
      console.log(error["key"] === undefined)
      if(error["key"] === undefined){
        delete error["key"];
      }
    }
    return error;
  }
  async ValidName(name){
    let error = {};
    if(!this.ValidCheckUndefined(name)){
      error["text"] = "Вы не указали название компания в теле ответа";
      error["info"] = "{'name': 'название компания'}";
      return error
    }else if(!this.ValidCheckType(name,"string")){
      error["text"] = "Название компания является строкой"
      return error;
    }
    else if(!this.ValidCheckValueUnique(name, "name")){
      error["text"] = "Название компания должно является уникальным значением";
      return error
    }
    else{ undefined}
  }
  async ValidAddress(address){
    let error = {};
    if(!this.ValidCheckUndefined(address)){
      error["text"] = "Вы не указали название адреса компании в теле ответа";
      error["info"] = "{'address': 'название адреса компании'}";
      return error
    }
    else if(!this.ValidCheckType(address,"string")){
        error["text"] = "Адрес компании должен являтся строкой";
      }
  }
} 