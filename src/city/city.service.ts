import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { City } from './city.entity';
import { CreateCityDto } from "./dto/create-city.dto"
@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City)
    private readonly CityRepository: Repository<City>,
  ) {}

  async create(CreateCityDto: CreateCityDto){
    const city = new City();
    city.name = CreateCityDto.name;
    const check = await this.ValidName(city.name);
    if(check === undefined){
      return this.CityRepository.save(city);
    }else{
      return check
    }
  }
  async update(id: string, body:CreateCityDto){
    const check = await this.ValidName(body.name);
    if(check === undefined){
      return {
        meta: 
        {
          status: 200, 
          text: `Запись c id ${id} Успешно измененна`
        }
      }
    }else{
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
        error: errorMessage,
        status: 404
      }
    }else{
      return {
        status: 200,
        text: "Запись удачно удалена",
      }
    }
  }
  async ValidName(name){
    if(name === undefined){
      return {error: "Вы не указали название города в теле ответа", info: "{'name': 'название города'}"}
    }
    else if(typeof name !== "string"){
      return {error: "Название города является строкой"}
    }
    else{
      let check  = await this.CityRepository.findOne({
        where: {name: name}
      })
      if(check !== undefined){
        return {error: "Название города должно является уникальным значением"}
      }

    }
  }
} 