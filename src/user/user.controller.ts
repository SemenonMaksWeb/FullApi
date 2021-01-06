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
import { UserService } from './user.service';
import { CreateUserDto, CreateUserAdminDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Post()
  async create(@Body() CreateUserDto: CreateUserDto) {
    const User:CreateUserDto = {
      login: CreateUserDto.login,
      password: CreateUserDto.password,
    }
    const data = await this.UserService.create(User);
    return { ...data};
  }
  @Post("/admin")
  async createAdmin(@Body() CreateUserAdminDto: CreateUserAdminDto) {
    const UserAdmin:CreateUserAdminDto = {
      login: CreateUserAdminDto.login,
      password: CreateUserAdminDto.password,
      isAdmin: CreateUserAdminDto.isAdmin
    }
    const data = await this.UserService.create(CreateUserAdminDto);
    return { ...data};
  }

  @Get()
  async findAll(@Query() query: string) {
    console.log(query);
    const data = await this.UserService.findAll(query.search);
    return { ...data};
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.UserService.findOne(id);;
    return { ...data};
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.UserService.remove(id);
    return { ...data};
  }
  
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() CreateUserDto: CreateUserDto,
  ) {
    const data = await this.UserService.update(id, CreateUserDto);
    return { ...data};
  }
}
