import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  findOne(id: string) {
    return this.CityRepository.findOne(id);
  }

  async remove(id: string) {
    await this.CityRepository.delete(id);
  }
} 