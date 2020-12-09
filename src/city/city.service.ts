import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { City } from './city.entity';
import { CreateCityDto } from "./dto/create-city.dto"
import { ApiValidateServer } from '../api_validate/api_validate.service';
@Injectable()
export class CityService {
  constructor(
    private readonly ApiValidateServer: ApiValidateServer,
    @InjectRepository(City)
    private readonly CityRepository: Repository<City>,
  ) {}

  async create(CreateCityDto: CreateCityDto){
    const city = new City();
    city.name = CreateCityDto.name;
    const check = await this.ValidName(city.name);
    if(this.ApiValidateServer.errorUndefined(check) === false){
      return this.CityRepository.save(city);
    }else{
      return check
    }
  }
  async update(id: string, body:CreateCityDto){
    const check = await this.ValidName(body.name);
    if(this.ApiValidateServer.errorUndefined(check) === false){
      let data = await this.CityRepository.update(id, body);
      let meta = this.setMetaUpdate(data.affected, id);
      return meta;
    }else if(check !== undefined){
      return check
    } 
  }
  findAll(search){
    if(search === undefined){
      return this.CityRepository.find();
    }else{
      return this.findLike(search);
    }
  }
  async findLike(nameQuery){
    return await this.CityRepository.find({
      name: Like(`${nameQuery}%`) 
    });
  }
  // findOne(id: string) {
  //   return this.CityRepository.findOne(id);
  // }
  async remove(id: string) {
    return await this.CityRepository.delete(id);
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
      meta["text"] = `Город с ${id} не найден`
      return meta;
    }else if(response === 1){
      meta["status"] = 200;
      meta["text"] = `Запись c id ${id} Успешно измененна`
      return meta;
    }
  }
  async ValidName(name){
    let error = {};
    if(this.ApiValidateServer.errorUndefined(name)){
      error["text"] = "Вы не указали название города в теле ответа";
      error["info"] = "{'name': 'название города'}";
      return error
    }
    else if(this.ApiValidateServer.errorType(name, "string") ){
      return {error: "Название города является строкой"}
    }
    else if(this.ApiValidateServer.errorUnique(this.CityRepository, name, "name")){
        error["text"] = "Название города должно является уникальным значением";
        return error
      }
  }
} 