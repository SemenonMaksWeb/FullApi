import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Put,
} from '@nestjs/common';
import { VacancyPositionService } from './vacancy_position.service';
import { CreateVacancyPositionDto } from './dto/create-vacancy_position.dto';

@Controller('vacancy_position')
export class VacancyPositionController {
  constructor(
    private readonly VacancyPositionService: VacancyPositionService,
  ) {}

  @Post()
  async create(@Body() CreateVacancyPositionDto: CreateVacancyPositionDto) {
    const data = await this.VacancyPositionService.create(
      CreateVacancyPositionDto,
    );
    return {
      ...data,
    };
  }

  @Get()
  async findAll(@Query('search') search: string) {
    const data = await this.VacancyPositionService.findAll(search);
    return {
      ...data,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    let data = await this.VacancyPositionService.findOne(id);
    return {
      ... data,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.VacancyPositionService.remove(id);
    return {
      ... data,
    };
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() CreateVacancyPositionDto: CreateVacancyPositionDto,
  ) {
    const data = await this.VacancyPositionService.update(
      id,
      CreateVacancyPositionDto,
    );
    return data;
  }
}
