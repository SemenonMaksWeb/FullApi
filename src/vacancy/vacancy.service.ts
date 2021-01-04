import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, In } from 'typeorm';
import { Vacancy } from './vacancy.entity';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { ApiValidateServer } from '../api_validate/api_validate.service';
import { ApiMetaServer } from '../api_meta/api_meta.service';
@Injectable()
export class VacancyService {
  constructor(
    private readonly ApiValidateServer: ApiValidateServer,
    private readonly ApiMetaServer: ApiMetaServer,
    @InjectRepository(Vacancy)
    private readonly VacancyRepository: Repository<Vacancy>,
  ) {}

  async create(body: CreateVacancyDto) {
    const check = await this.checkValidAll(body);
    if (this.ApiValidateServer.errorObjectNull(check)) {
      return { data: check, meta: this.ApiMetaServer.MetaServerValidate() };
    } else {
      return{
        data: await this.VacancyRepository.save(body),
        meta: this.ApiMetaServer.MetaServerPost(), 
      }
       
    }
  }

  async update(body: CreateVacancyDto, id: string) {
    const check = await this.checkValidAll(body, id);
    if (this.ApiValidateServer.errorObjectNull(check)) {
       return { data: check, meta: this.ApiMetaServer.MetaServerValidate() };
    } else {
      const data = await this.VacancyRepository.update(id, body);
      return{
        meta: this.ApiMetaServer.MetaServerUpdate(data, 'не найдена запись'),
      }

    }
  }

  async findAll(query, limit = 2) {
    const pagination:{skip?: number, take?:number} = this.setPagination(query.page, limit);
    const where = this.setWhere(query.search, query.city, query.vacancy);
    const data = await this.VacancyRepository.createQueryBuilder("data")
      .select([
          "data.id" as "id",
          "content" as "content",
          "title" as "title",
          "data.active" as "data_active",
          "conditions" as "data_conditions",
          "requirements" as "data_requirements",
          "duties" as "data_requirements",
          "type_work" as "data_type_work",
          "experience" as "data_experience",
          "chart_work" as "data_chart_work",
          "income_min" as "data_income_min",
          "income_max" as "data_income_max",
          "city.name",
          "city.id",
          "company.name",
          "company.id",
          "company.active"

      ])
      .innerJoin("data.city", "city")
      .innerJoin("data.company", "company")
      .where(where)
      .andWhere("city.id = data.cityId")
      .andWhere("company.id = data.companyId")
      .skip(pagination.skip)
      .take(pagination.take)
      // .getSql();
      .execute();
      console.log(data);
      data.forEach(element => {
        element.id  = element.data_id;
        element.active  = element.data_active;
        element.city = {
          id: element.city_id,
          name: element.city_name,
        }
        element.company = {
          id: element.company_id,
          name: element.company_name,
          active: element.company_active,
        }
        delete element.city_id;
        delete element.data_id;
        delete element.city_name;
        delete element.company_id;
        delete element.company_name;
        delete element.company_active;
        delete element.data_active;
      });
    return {
      data: data,
      meta: this.ApiMetaServer.MetaServerGet(data, 'Записи не найдены'),
    }
  }

  async findOne(id: string) {
    const data  = await this.VacancyRepository.findOne(id, {
      relations: ['city', 'vacancy_position', 'company'],
    });
    return {
      data: data,
      meta: this.ApiMetaServer.MetaServerGet(data, 'Записи не найдены'),
    }
  }

  async remove(id: string) {
    return {
      meta: this.ApiMetaServer.MetaServerDelete(
        await this.VacancyRepository.delete(id),
        'Запись не найдена',
      ),
    };
  }

  async checkValidAll(body, id?: string) {
    let error = {};
    error['income_min'] = this.checkValidIncomeType(body.income_min);
    error['income_max'] = this.checkValidIncomeType(body.income_max);
    error['chart_work'] = this.checkValidStringUndefined(body.chart_work);
    error['experience'] = this.checkValidStringUndefined(body.experience);
    error['content'] = this.checkValidStringUndefined(body.content);
    error['conditions'] = this.checkValidStringUndefined(body.conditions);
    error['duties'] = this.checkValidStringUndefined(body.duties);
    error['requirements'] = this.checkValidStringUndefined(body.requirements);
    error['type_work'] = this.checkValidTypeWork(body.type_work);
    error['title'] = await this.checkValidTitle(body.title, Number(id));
    error['city'] = await this.checkValidCity(body.city);
    error['company'] = await this.checkValidCompany(body.company);
    error['position'] = await this.checkValidPosition(body.vacancy_position);
    if (
      error['income_min'] === undefined &&
      error['income_max'] === undefined
    ) {
      if (
        this.ApiValidateServer.errorMinMax(body.income_min, body.income_max)
      ) {
        error['income'] = {};
        error['income']['text'] = 'минимальный доход больше максимального';
      }
    }
    error = this.ApiValidateServer.errorUndefinedDelete(error);
    return error;
  }

  async checkValidCity(value) {
    if (this.ApiValidateServer.errorUndefined(value)) {
      return { text: 'Вы не указали id города', info: "'city': 'id города'" };
    } else {
      if (await this.ApiValidateServer.errorGetRepositoryId('city', value)) {
        return { text: 'указанный город не найден' };
      }
    }
  }

  async checkValidCompany(value) {
    if (this.ApiValidateServer.errorUndefined(value)) {
      return {
        text: 'Вы не указали id компании',
        info: "'company': 'id компании'",
      };
    } else {
      if (await this.ApiValidateServer.errorGetRepositoryId('сompany', value)) {
        return { text: 'указанная компания не указана не найден' };
      }
    }
  }

  async checkValidPosition(value) {
    if (this.ApiValidateServer.errorUndefined(value)) {
      return {
        text: 'Вы не указали id должности',
        info: "'position': 'id должности'",
      };
    } else {
      if (
        await this.ApiValidateServer.errorGetRepositoryId(
          'vacancy_position',
          value,
        )
      ) {
        return { text: 'указанная должность не найдена' };
      }
    }
  }

  checkValidStringUndefined(value) {
    if (this.ApiValidateServer.errorUndefined(value) === false) {
      if (this.ApiValidateServer.errorType(value, 'string')) {
        return { text: 'Указанное значение не является строкой' };
      }
    }
  }

  checkValidIncomeType(value) {
    if (this.ApiValidateServer.errorType(value, 'number')) {
      return { text: 'Указанное значение не является числом' };
    }
  }

  checkValidTypeWork(value) {
    const validValue = ['Удаленный', 'В компании', null];
    if (validValue.filter((data) => data === value).length === 0) {
      return {
        text: 'Тип работы указан не корректно',
        info: 'Удаленный, В компании, null',
      };
    }
  }

  async checkValidTitle(value, id?:number) {
    const error = {};
    if (this.ApiValidateServer.errorUndefined(value)) {
      error['text'] = 'Вы не указали вакансии города в теле ответа';
      error['info'] = "{'title': 'название вакансии'}";
      return error;
    } else if (this.ApiValidateServer.errorType(value, 'string')) {
      return { error: 'Название вакансии является строкой' };
    } else if (
      await this.ApiValidateServer.errorUnique(
        this.VacancyRepository,
        value,
        'title',
        id
      )
    ) {
      error['text'] = 'Название вакансии должно является уникальным значением';
      return error;
    }
  }
  
  setPagination(page, limit): {skip?: number, take?:number} {
    const pagination = {};
    pagination['take'] = limit;
    if (page !== undefined && page !== 1) {
      pagination['skip'] = limit * Number(page - 1);
    }
    return pagination;
  }

  setWhere(search, city, vacancy) {
    const where = {};
    if (search !== undefined) {
      where['title'] = Like(`${search}%`);
    }
    if (city !== undefined) {
      where['city'] = In(city.split(','));
    }
    if (vacancy !== undefined) {
      where['vacancy_position'] = In(vacancy.split(','));
    }
    return where;
  }
}
