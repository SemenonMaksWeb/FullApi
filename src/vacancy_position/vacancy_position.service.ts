import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { VacancyPosition } from './vacancy_position.entity';
import { CreateVacancyPositionDto } from './dto/create-vacancy_position.dto';
import { ApiValidateServer } from '../api_validate/api_validate.service';
import { ApiMetaServer } from '../api_meta/api_meta.service';
@Injectable()
export class VacancyPositionService {
  constructor(
    private readonly ApiValidateServer: ApiValidateServer,
    private readonly ApiMetaServer: ApiMetaServer,
    @InjectRepository(VacancyPosition)
    private readonly VacancyPositionRepository: Repository<VacancyPosition>,
  ) {}

  async create(CreateVacancyPositionDto: CreateVacancyPositionDto) {
    const vacancy_position = new VacancyPosition();
    vacancy_position.name = CreateVacancyPositionDto.name;
    const check = await this.ValidName(vacancy_position.name);
    if (this.ApiValidateServer.errorUndefined(check)) {
      return {
        data: await this.VacancyPositionRepository.save(vacancy_position),
        meta: this.ApiMetaServer.MetaServerPost(),
      };
    } else {
      return { data: check, meta: this.ApiMetaServer.MetaServerValidate() };
    }
  }
  async update(id: string, body: CreateVacancyPositionDto) {
    const check = await this.ValidName(body.name, Number(id));
    if (this.ApiValidateServer.errorUndefined(check)) {
      const data = await this.VacancyPositionRepository.update(id, body);
      return {
        meta: this.ApiMetaServer.MetaServerUpdate(data, 'не найдена запись'),
      };
    } else if (check !== undefined) {
      return { data: check, meta: this.ApiMetaServer.MetaServerValidate() };
    }
  }
  async findAll(search) {
    if (search === undefined) {
      const data = await this.VacancyPositionRepository.find();
      return {
        data: data,
        meta: this.ApiMetaServer.MetaServerGet(data, 'Записи не найдены'),
      };
    } else {
      const data = await this.findLike(search);
      return {
        data: data,
        meta: this.ApiMetaServer.MetaServerGet(data, 'Записи не найдены'),
      };
    }
  }
  async findLike(nameQuery) {
    const data = await this.VacancyPositionRepository.find({
      name: Like(`${nameQuery}%`),
    });
    return data;
  }
  async findOne(id: string) {
    const data = await this.VacancyPositionRepository.findOne(id);
    return {
      data: data,
      meta: this.ApiMetaServer.MetaServerGet(data, 'Записи не найдены'),
    };
  }
  async remove(id: string) {
    return {
      meta: this.ApiMetaServer.MetaServerDelete(
        await this.VacancyPositionRepository.delete(id),
        'Запись не найдена',
      ),
    };
  }

  async ValidName(name, id?: number) {
    const error = {};
    if (this.ApiValidateServer.errorUndefined(name)) {
      error['text'] =
        'Вы не указали название должности вакансииа в теле ответа';
      error['info'] = "{'name': 'название должности вакансии'}";
      return error;
    } else if (this.ApiValidateServer.errorType(name, 'string')) {
      return { error: 'Название должности вакансииа является строкой' };
    } else {
      const check = await this.ApiValidateServer.errorUnique(
        this.VacancyPositionRepository,
        name,
        'name',
        id,
      );
      if (check) {
        error['text'] =
          'Название должности вакансииа должно является уникальным значением';
        return error;
      }
    }
  }
}
