import { Body, Controller, Get, Param, Post, Query, Delete } from '@nestjs/common';
import { VacancyService } from './vacancy.service';
import { CreateVacancyDto } from './dto/create-vacancy.dto';

@Controller('vacancy')
export class VacancyController {
  constructor(private readonly VacancyService: VacancyService) {}

  @Post()
  async create(@Body() CreateVacancyDto: CreateVacancyDto) {
    const data = await this.VacancyService.create(CreateVacancyDto);
    return data;
  }

  @Get()
  async findAll(@Query() query) {
    console.log(query);
    const data = await this.VacancyService.findAll(query);
    const meta = this.VacancyService.setMetaGet(data, `Вакансии не найдены`);
    return {
      data,
      meta,
    };
  }
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.VacancyService.remove(id);
    const meta = this.VacancyService.setMetaDelete(
      data,
      `Вакансия с id ${id} не найдена`,
    );
    return {
      meta,
    };
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.VacancyService.findOne(id);
    const meta = this.VacancyService.setMetaGet(
      data,
      `Вакансия с id ${id} не найдена`,
    );
    return {
      data,
      meta,
    };
  }
}
