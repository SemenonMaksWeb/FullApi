import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vacancy } from './vacancy.entity';
import { CreateVacancyDto } from "./dto/create-vacancy.dto"
@Injectable()
export class VacancyService {
  constructor(
    @InjectRepository(Vacancy)
    private readonly VacancyRepository: Repository<Vacancy>,
  ) {}

  create(CreateVacancyDto: CreateVacancyDto){
    let vacancy = new Vacancy();
    let NotValid = {};
    vacancy.chart_work = CreateVacancyDto.chart_work;
    vacancy.income_max = CreateVacancyDto.income_max;
    vacancy.income_min = CreateVacancyDto.income_min;
    NotValid["income_min"] = this.checkValidIncomeMin(vacancy.income_min);
    NotValid["chart_work"] = this.checkValidChartWork(vacancy.chart_work);
    NotValid = this.checkErrorAll(NotValid);
    if(NotValid){
      return {error: NotValid}
    }else{
      return vacancy;
    }
    // return this.VacancyRepository.save(vacancy);
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
  
  checkValidChartWork(value){
    let NotValid = {};
    if(typeof value !== "string"){
      NotValid["type"] = "Указанное значение не является строкой";
    }
    return NotValid;
  }
  checkValidIncomeMin(value){
    let NotValid = {};
    if(typeof value !== "number"){
      NotValid["type"] = "Указанное значение не является числом";
    }
    return NotValid;
  }
  
  checkErrorAll(error:Object){
     for (const key in error) {
      if(Object.keys(error[key]).length === 0){
        delete error[key];
      }
     }
     if(Object.keys(error).length === 0){
       return undefined;
     }else{
      return error;
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