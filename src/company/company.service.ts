import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiValidateServer } from '../api_validate/api_validate.service';
import { Like, Repository } from 'typeorm';
import { Сompany } from './company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
@Injectable()
export class CompanyService {
  constructor(
    private readonly ApiValidateServer: ApiValidateServer,
    @InjectRepository(Сompany)
    private readonly CompanyRepository: Repository<Сompany>,
  ) {}

  async create(CreateCompanyDto: CreateCompanyDto) {
    const check = await this.ValidAll(CreateCompanyDto);
    if (this.ApiValidateServer.errorObjectNull(check) === false) {
      return await this.CompanyRepository.save(CreateCompanyDto);
    } else {
      return check;
    }
  }
  async update(id: string, CreateCompanyDto: CreateCompanyDto) {
    const check = await this.ValidAll(CreateCompanyDto);
    if (this.ApiValidateServer.errorObjectNull(check) === false) {
      const data = await this.CompanyRepository.update(id, CreateCompanyDto);
      const meta = this.setMetaUpdate(data.affected, id);
      return meta;
    } else {
      return check;
    }
  }
  findAll(search: string) {
    if (search === undefined) {
      return this.CompanyRepository.find();
    } else {
      return this.findLike(search);
    }
  }
  async findLike(nameQuery) {
    return await this.CompanyRepository.find({
      name: Like(`${nameQuery}%`),
    });
  }
  findOne(id: string) {
    return this.CompanyRepository.findOne(id);
  }
  async remove(id: string) {
    return await this.CompanyRepository.delete(id);
  }
  setMetaGet(response, errorMessage: string) {
    if (response === undefined || response.length === 0) {
      return {
        error: errorMessage,
        status: 404,
      };
    } else {
      return {
        status: 200,
      };
    }
  }
  setMetaDelete(response, errorMessage: string) {
    if (response.affected === 0) {
      //  Количество удаленных записей
      return {
        text: errorMessage,
        status: 404,
      };
    } else {
      return {
        status: 200,
        text: 'Запись удачно удалена',
      };
    }
  }
  setMetaUpdate(response: number, id: string) {
    const meta = {};
    if (response === 0) {
      meta['status'] = 404;
      meta['text'] = `Компания с ${id} не найден`;
      return meta;
    } else if (response === 1) {
      meta['status'] = 200;
      meta['text'] = `Запись c id ${id} Успешно измененна`;
      return meta;
    }
  }
  async ValidAll(body) {
    let error = {};
    error['name'] = await this.ValidName(body.name);
    error['address'] = await this.ValidAddress(body.address);
    error['url_google_maps'] = await this.ValidGoogleMap(body.url_google_maps);
    error = this.ApiValidateServer.errorUndefinedDelete(error);
    return error;
  }
  async ValidName(name) {
    const error = {};
    if (this.ApiValidateServer.errorUndefined(name)) {
      error['text'] = 'Вы не указали название компания в теле ответа';
      error['info'] = "{'name': 'название компания'}";
      return error;
    } else if (this.ApiValidateServer.errorType(name, 'string')) {
      error['text'] = 'Название компания является строкой';
      return error;
    } else if (
      await this.ApiValidateServer.errorUnique(
        this.CompanyRepository,
        name,
        'name',
      )
    ) {
      error['text'] = 'Название компания должно является уникальным значением';
      return error;
    }
  }
  async ValidAddress(address) {
    const error = {};
    if (this.ApiValidateServer.errorUndefined(address)) {
      error['text'] = 'Вы не указали название адреса компании в теле ответа';
      error['info'] = "{'address': 'название адреса компании'}";
      return error;
    } else if (this.ApiValidateServer.errorType(address, 'string')) {
      error['text'] = 'Адрес компании должен являтся строкой';
      return error;
    }
  }
  async ValidGoogleMap(url: string) {
    const error = {};
    if (this.ApiValidateServer.errorUndefined(url) === false) {
      if (this.ApiValidateServer.errorType(url, 'string')) {
        error['text'] = 'Сслыка на гугл карту должна быть строкой';
        error['info'] = "{'url_google_maps': 'url-address'}";
        return error;
      }
    }
  }
}
