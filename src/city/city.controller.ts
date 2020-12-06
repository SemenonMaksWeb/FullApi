import { Body, Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { CityService } from './city.service';
import { CreateCityDto } from "./dto/create-city.dto"

@Controller('city')
export class CityController {
  constructor(private readonly CityService: CityService) {}

  @Post()
  async create(@Body() CreateCityDto: CreateCityDto) {
    let data = await this.CityService.create(CreateCityDto);
    return {
      data
    }
  }

  @Get()
  async findAll() {
    let data = await this.CityService.findAll();
    let meta  = this.CityService.setMetaGet(data, `Города не созданы`); 
    return {
      data,
      meta
    }
  }
  @Get('like/:name')
  async findLike(@Param('name') name: string) {
    let data = await this.CityService.findLike(name);
    let meta  = this.CityService.setMetaGet(data, `Город ${name} не найден`); 
    return {
      data,
      meta
    }
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    let data = await this.CityService.findOne(id);
    let meta  = this.CityService.setMetaGet(data, `Город с id ${id} не найден`); 
    return {
      data,
      meta
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    let data = await this.CityService.remove(id);
    let meta = this.CityService.setMetaDelete(data, `Город с id ${id} не найден`); 
    return {
      meta
    }
  }
}