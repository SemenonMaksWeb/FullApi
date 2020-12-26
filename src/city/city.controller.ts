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
import { CityService } from './city.service';
import { CreateCityDto } from './dto/create-city.dto';

@Controller('city')
export class CityController {
  constructor(private readonly CityService: CityService) {}

  @Post()
  async create(@Body() CreateCityDto: CreateCityDto) {
    const data = await this.CityService.create(CreateCityDto);
    return {
      data,
    };
  }

  @Get()
  async findAll(@Query('search') search: string) {
    const data = await this.CityService.findAll(search);
    const meta = this.CityService.setMetaGet(data, `Города не найдены`);
    return {
      data,
      meta,
    };
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    let data = await this.CityService.findOne(id);
    let meta = this.CityService.setMetaGet(data, `Город с id ${id} не найден`);
    return {
      data,
      meta,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.CityService.remove(id);
    const meta = this.CityService.setMetaDelete(
      data,
      `Город с id ${id} не найден`,
    );
    return {
      meta,
    };
  }
  @Put(':id')
  async update(@Param('id') id: string, @Body() CreateCityDto: CreateCityDto) {
    const data = await this.CityService.update(id, CreateCityDto);
    return data;
  }
}
