import { Body, Controller, Delete, Get, HttpCode, Param, Post, Query } from '@nestjs/common';
import { VacancyService } from './vacancy.service';
import { CreateVacancyDto } from "./dto/create-vacancy.dto"

@Controller('vacancy')
export class VacancyController {
  constructor(private readonly VacancyService: VacancyService) {}

  @Post()
  async create(@Body() CreateVacancyDto: CreateVacancyDto) {
    let data = await this.VacancyService.create(CreateVacancyDto);
    return data;
  }

  @Get()
  async findAll() {
    let data = await this.VacancyService.findAll();
    // let meta  = this.VacancyService.setMetaGet(data, `Вакансии не созданы`); 
    return {
      data,
      // meta
    }
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    let data = await this.VacancyService.findOne(id);
    let meta  = this.VacancyService.setMetaGet(data, `Вакансия с id ${id} не найдена`); 
    return {
      data,
      meta
    }
  }
}