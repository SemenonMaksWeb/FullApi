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
    return { ...data };
  }

  @Get()
  async findAll(@Query('search') search: string) {
    const data = await this.CityService.findAll(search);
    return { ...data };
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    let data = await this.CityService.findOne(id);
    return { ...data };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.CityService.remove(id);
    return { ...data };
  }
  
  @Put(':id')
  async update(@Param('id') id: string, @Body() CreateCityDto: CreateCityDto) {
    const data = await this.CityService.update(id, CreateCityDto);
    return { ...data };
  }
}
