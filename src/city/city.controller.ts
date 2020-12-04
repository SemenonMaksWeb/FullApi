import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CityService } from './city.service';
import { CreateCityDto } from "./dto/create-city.dto"

@Controller('city')
export class CityController {
  constructor(private readonly CityService: CityService) {}

  @Post()
  create(@Body() CreateCityDto: CreateCityDto) {
    return {
      data: this.CityService.create(CreateCityDto)
    }
  }

  @Get()
  async findAll() {
    return {
      data: await this.CityService.findAll()
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    let data = await this.CityService.findOne(id);
    // if(data === undefined){
    //   return{
    //     meta:{
    //       error: `Город с id ${id} не найден`,
    //       status: 404,
    //     }
    //   }
    // }
    return {
      data: data,
      // meta:{
      //   status: 200,
      // }
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.CityService.remove(id)
    return {
       
    }
  }
}