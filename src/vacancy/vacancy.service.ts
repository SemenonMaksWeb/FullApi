import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vacancy } from './vacancy.entity';
import { CreateVacancyDto } from "./dto/create-vacancy.dto"
import { ApiValidateServer } from '../api_validate/api_validate.service';

@Injectable()
export class VacancyService {
  constructor(
    private readonly ApiValidateServer: ApiValidateServer,
    @InjectRepository(Vacancy)
    private readonly VacancyRepository: Repository<Vacancy>,
  ) {}

  create(CreateVacancyDto:CreateVacancyDto){
    let NotValid = this.checkValidAll(CreateVacancyDto);
    if(this.ApiValidateServer.errorObjectNull(NotValid)){
      return {error: NotValid}
    }else{
      return CreateVacancyDto
      // return this.VacancyRepository.save(CreateVacancyDto);
    }
  }
  findAll(){
    return this.VacancyRepository.find();
  }
  findOne(id: string) {
    return this.VacancyRepository.findOne(id);
  }
  async remove(id: string) {
    return await this.VacancyRepository.delete(id);
  }
  async checkValidAll(body){
    let error = {};
    error['income_min'] = this.checkValidIncomeType(body.income_min);
    error['income_max'] = this.checkValidIncomeType(body.income_max);
    error["chart_work"] = this.checkValidStringUndefined(body.chart_work);
    error['experience'] = this.checkValidStringUndefined(body.experience);
    error['content'] = this.checkValidStringUndefined(body.content);
    error['conditions'] = this.checkValidStringUndefined(body.conditions);
    error['duties'] = this.checkValidStringUndefined(body.duties);
    error['requirements'] = this.checkValidStringUndefined(body.requirements);
    error['type_work'] = this.checkValidTypeWork(body.type_work);
    error['title'] = await this.checkValidTitle(body.title);
    error['title'] = await this.checkValidTitle(body.title);
    if(error['income_min'] === undefined && error['income_max'] === undefined){
      if(this.ApiValidateServer.errorMinMax(body.income_min,body.income_max )){
        error['income'] = {};
        error['income']['text'] = "минимальный доход больше максимального";
      }
    }
    error = this.ApiValidateServer.errorUndefinedDelete(error);
    return error;
  }
  checkValidStringUndefined(value){
    if(this.ApiValidateServer.errorUndefined(value) === false){
      if(this.ApiValidateServer.errorType(value, "string")){
        return {text: "Указанное значение не является строкой"};
      }
    }
  }
  checkValidIncomeType(value){
    if(this.ApiValidateServer.errorType(value, "number")){
      return {text: "Указанное значение не является числом"};
    }
  }
  async checkValidForeignKey(column, id ){
    if(this.ApiValidateServer.errorUndefined(id) === false){
      console.log(await this.VacancyRepository.findByIds(id));
    }
  }
  
  checkValidTypeWork(value){
    let validValue = ["Удаленный", "В компании", null];
    if(validValue.filter(data => data === value).length === 0){
      return {text: "Тип работы указан не корректно", info: "Удаленный, В компании, null"}
    }
  } 
  async checkValidTitle(value){
    let error = {};
    if(this.ApiValidateServer.errorUndefined(value)){
      error["text"] = "Вы не указали вакансии города в теле ответа";
      error["info"] = "{'title': 'название вакансии'}";
      return error
    }
    else if(this.ApiValidateServer.errorType(value, "string") ){
      return {error: "Название вакансии является строкой"}
    }
    else if(await this.ApiValidateServer.errorUnique(this.VacancyRepository, value, "title")){
      error["text"] = "Название вакансии должно является уникальным значением";
      return error
    }
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