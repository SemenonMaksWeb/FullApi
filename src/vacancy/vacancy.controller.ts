import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Delete,
  Put
} from '@nestjs/common';
import { VacancyService } from './vacancy.service';
import { CreateVacancyDto } from './dto/create-vacancy.dto';

@Controller('vacancy')
export class VacancyController {
  constructor(private readonly VacancyService: VacancyService) {}

  @Post()
  async create(@Body() CreateVacancyDto: CreateVacancyDto) {
    const data = await this.VacancyService.create(CreateVacancyDto);
    return { ...data };
  }

  @Get()
  async findAll(@Query() query) {
    const data = await this.VacancyService.findAll(query);
    return { ...data };
  }
  
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.VacancyService.remove(id);
    return { ...data };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.VacancyService.findOne(id);
    return { ...data };
  }
  
  @Put(':id')
  async update(@Param('id') id: string, @Body() CreateCityDto: CreateVacancyDto) {
    const data = await this.VacancyService.update(CreateCityDto, id);
    return { ...data };
  }
}
  