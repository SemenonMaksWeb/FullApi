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

  create(CreateCityDto: CreateCityDto){
    const user = new City();
    user.name = CreateCityDto.name;
    return this.CityRepository.save(user);
  }
  findAll(){
    return this.CityRepository.find();
  }
  async findLike(nameQuery){
    console.log(nameQuery);
    return await this.CityRepository.find({
      name: nameQuery 
    });
  }
  findOne(id: string) {
    return this.CityRepository.findOne(id);
  }
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
} 