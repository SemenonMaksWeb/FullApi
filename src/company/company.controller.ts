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
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';

@Controller('company')
export class СompanyController {
  constructor(private readonly СompanyService: CompanyService) {}

  @Post()
  async create(@Body() CreateСompanyDto: CreateCompanyDto) {
    const data = await this.СompanyService.create(CreateСompanyDto);
    return {
      data,
    };
  }

  @Get()
  async findAll(@Query('search, page') search: string) {
    const data = await this.СompanyService.findAll(search);
    const meta = this.СompanyService.setMetaGet(data, `Города не найдены`);
    return {
      data,
      meta,
    };
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.СompanyService.findOne(id);
    const meta = this.СompanyService.setMetaGet(
      data,
      `Город с id ${id} не найден`,
    );
    return {
      data,
      meta,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.СompanyService.remove(id);
    const meta = this.СompanyService.setMetaDelete(
      data,
      `Город с id ${id} не найден`,
    );
    return {
      meta,
    };
  }
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() CreateСompanyDto: CreateCompanyDto,
  ) {
    const data = await this.СompanyService.update(id, CreateСompanyDto);
    return data;
  }
}
