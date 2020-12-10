import { Body, Controller, Delete, Get, Param, Post, Query, Put } from '@nestjs/common';
import { VacancyPositionService } from './vacancy_position.service';
import { CreateVacancyPositionDto } from "./dto/create-vacancy_position.dto"

@Controller('vacancy_position')
export class VacancyPositionController {
  constructor(private readonly VacancyPositionService: VacancyPositionService) {}

  @Post()
  async create(@Body() CreateVacancyPositionDto: CreateVacancyPositionDto) {
    let data = await this.VacancyPositionService.create(CreateVacancyPositionDto);
    return {
      data
    }
  }

  @Get()
  async findAll(@Query('search') search: string) {
    let data = await this.VacancyPositionService.findAll(search);
    let meta  = this.VacancyPositionService.setMetaGet(data, `Должности вакансии не найдены`); 
    return {
      data,
      meta
    }
  }
  // @Get(':id')
  // async findOne(@Param('id') id: string) {
  //   let data = await this.VacancyPositionService.findOne(id);
  //   let meta  = this.VacancyPositionService.setMetaGet(data, `Должности вакансии с id ${id} не найден`); 
  //   return {
  //     data,
  //     meta
  //   }
  // }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    let data = await this.VacancyPositionService.remove(id);
    let meta = this.VacancyPositionService.setMetaDelete(data, `Должность вакансии с id ${id} не найдена`); 
    return {
      meta
    }
  }
  @Put(':id')
  async update(@Param('id') id: string, @Body() CreateVacancyPositionDto: CreateVacancyPositionDto) {
    let data = await this.VacancyPositionService.update(id, CreateVacancyPositionDto);
    return data;
    
  }
}