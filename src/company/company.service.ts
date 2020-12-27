import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiValidateServer } from '../api_validate/api_validate.service';
import { Like, Repository } from 'typeorm';
import { Сompany } from './company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { ApiMetaServer } from '../api_meta/api_meta.service';

@Injectable()
export class CompanyService {
  constructor(
    private readonly ApiValidateServer: ApiValidateServer,
    private readonly ApiMetaServer: ApiMetaServer,
    @InjectRepository(Сompany)
    private readonly CompanyRepository: Repository<Сompany>,
  ) {}

  async create(body: CreateCompanyDto) {
    const check = await this.ValidAll(body);
    if (this.ApiValidateServer.errorObjectNull(check) === false) {
      return {
        data: await this.CompanyRepository.save(body),
        meta: this.ApiMetaServer.MetaServerPost(),
      }
    } else {
      return { data: check, meta: this.ApiMetaServer.MetaServerValidate() };
    }
  }

  async update(id: string, body: CreateCompanyDto) {
    const check = await this.ValidAll(body, id);
    if (this.ApiValidateServer.errorObjectNull(check) === false) {
      const data = await this.CompanyRepository.update(id, body);
      return {
        meta: this.ApiMetaServer.MetaServerUpdate(data, 'не найдена запись'),
      };

    } else{
      return { data: check, meta: this.ApiMetaServer.MetaServerValidate() };
    }
  }

  async findAll(search) {
    let data = undefined;
    if (search === undefined) {
      data = await this.CompanyRepository.find();
    } else {
      data = await this.findLike(search);
    }
    return {
      data: data,
      meta: this.ApiMetaServer.MetaServerGet(data, 'Записи не найдены'),
    };
  }

  async findLike(nameQuery) {
    return await this.CompanyRepository.find({
      name: Like(`${nameQuery}%`),
    });
  }

  async findOne(id: string) {
    const data = await this.CompanyRepository.findOne(id);
    return {
      data: data,
      meta: this.ApiMetaServer.MetaServerGet(data, 'Записи не найдены'),
    };
  }
  async remove(id: string) {
    return {
      meta: this.ApiMetaServer.MetaServerDelete(
        await this.CompanyRepository.delete(id),
        'Запись не найдена',
      ),
    };
  }

  async ValidAll(body, id?:string) {
    let error = {};
    error['name'] = await this.ValidName(body.name, Number(id));
    error['address'] = await this.ValidAddress(body.address);
    error['url_google_maps'] = await this.ValidGoogleMap(body.url_google_maps);
    error = this.ApiValidateServer.errorUndefinedDelete(error);
    return error;
  }
  
  async ValidName(name, id?: number) {
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
        id
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
