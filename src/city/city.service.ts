import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { City } from './city.entity';
import { CreateCityDto } from './dto/create-city.dto';
import { ApiValidateServer } from '../api_validate/api_validate.service';
import { ApiMetaServer } from '../api_meta/api_meta.service';

@Injectable()
export class CityService {
  constructor(
    private readonly ApiValidateServer: ApiValidateServer,
    private readonly ApiMetaServer: ApiMetaServer,
    @InjectRepository(City)
    private readonly CityRepository: Repository<City>,
  ) {}

  async create(body: CreateCityDto) {
    const city = new City();
    city.name = body.name;
    const check = await this.ValidName(city.name);
    if (this.ApiValidateServer.errorUndefined(check)) {
      return {
        data: await this.CityRepository.save(city),
        meta: this.ApiMetaServer.MetaServerPost(),
      };
    } else {
      return { data: check, meta: this.ApiMetaServer.MetaServerValidate() };
    }
  }

  async update(id: string, body: CreateCityDto) {
    const check = await this.ValidName(body.name, Number(id));
    if (this.ApiValidateServer.errorUndefined(check)) {
      const data = await this.CityRepository.update(id, body);
      return {
        meta: this.ApiMetaServer.MetaServerUpdate(data, 'не найдена запись'),
      };
    } else {
      return { data: check, meta: this.ApiMetaServer.MetaServerValidate() };
    }
  }

  async findAll(search) {
    let data = undefined;
    if (search === undefined) {
      data = await this.CityRepository.find();
    } else {
      data = await this.findLike(search);
    }
    return {
      data: data,
      meta: this.ApiMetaServer.MetaServerGet(data, 'Записи не найдены'),
    };
  }

  async findLike(nameQuery) {
    return await this.CityRepository.find({
      name: Like(`${nameQuery}%`),
    });
  }
  
  async findOne(id: string) {
    const data = await this.CityRepository.findOne(id);
    return {
      data: data,
      meta: this.ApiMetaServer.MetaServerGet(data, 'Записи не найдены'),
    };
  }

  async remove(id: string) {
    return {
      meta: this.ApiMetaServer.MetaServerDelete(
        await this.CityRepository.delete(id),
        'Запись не найдена',
      ),
    };
  }

  async ValidName(name, id?: number) {
    const error = {};
    if (this.ApiValidateServer.errorUndefined(name)) {
      error['text'] = 'Вы не указали название города в теле ответа';
      error['info'] = "{'name': 'название города'}";
      return error;
    } else if (this.ApiValidateServer.errorType(name, 'string')) {
      return { error: 'Название города является строкой' };
    } else if (
      await this.ApiValidateServer.errorUnique(this.CityRepository, name, 'name', id)
    ) {
      error['text'] = 'Название города должно является уникальным значением';
      return error;
    }
  }
}
