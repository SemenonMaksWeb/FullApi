import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { VacancyPosition } from './vacancy_position.entity';
import { CreateVacancyPositionDto } from "./dto/create-vacancy_position.dto"
import { ApiValidateServer } from '../api_validate/api_validate.service';
@Injectable()
export class VacancyPositionService {
  constructor(
    private readonly ApiValidateServer: ApiValidateServer,
    @InjectRepository(VacancyPosition)
    private readonly VacancyPositionRepository: Repository<VacancyPosition>,
  ) {}

  async create(CreateVacancyPositionDto: CreateVacancyPositionDto){
    const vacancy_position = new VacancyPosition();
    vacancy_position.name = CreateVacancyPositionDto.name;
    const check = await this.ValidName(vacancy_position.name);
    if(this.ApiValidateServer.errorUndefined(check)){
      return this.VacancyPositionRepository.save(vacancy_position);
    }else{
      return check
    }
  }
  async update(id: string, body:CreateVacancyPositionDto){
    const check = await this.ValidName(body.name);
    if(this.ApiValidateServer.errorUndefined(check)){
      let data = await this.VacancyPositionRepository.update(id, body);
      let meta = this.setMetaUpdate(data.affected, id);
      return meta;
    }else if(check !== undefined){
      return check
    } 
  }
  findAll(search){
    if(search === undefined){
      return this.VacancyPositionRepository.find();
    }else{
      return this.findLike(search);
    }
  }
  async findLike(nameQuery){
    return await this.VacancyPositionRepository.find({
      name: Like(`${nameQuery}%`) 
    });
  }
  // findOne(id: string) {
  //   return this.vacancy_positionRepository.findOne(id);
  // }
  async remove(id: string) {
    return await this.VacancyPositionRepository.delete(id);
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
      meta["text"] = `должности вакансии с ${id} не найден`
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
      error["text"] = "Вы не указали название должности вакансииа в теле ответа";
      error["info"] = "{'name': 'название должности вакансииа'}";
      return error
    }
    else if(this.ApiValidateServer.errorType(name, "string") ){
      return {error: "Название должности вакансииа является строкой"}
    }
    else if(this.ApiValidateServer.errorUnique(this.VacancyPositionRepository, name, "name")){
        error["text"] = "Название должности вакансииа должно является уникальным значением";
        return error
      }
  }
} 