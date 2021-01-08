import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';

const bcrypt = require('bcrypt');
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly UserRepository: Repository<Users>,
  ){}
  async create(createUserDto: CreateUserDto) {
    const user = await this.findOneValidate(createUserDto.login, createUserDto.email);
    const message:string[] = this.validateCheckUnique(user, createUserDto);
    if(message.length != 0){
      return { statusCode: 400, message, error: "Bad Request"};
    }
    createUserDto.password =  this.HashPassword(createUserDto.password);
    const data = {
      login: createUserDto.login,
      password: createUserDto.password,
      email: createUserDto.email,
      srcСonfirmEmail: this.HashAdressEmail(createUserDto.login)
    }
    await this.UserRepository.save(data);
    return {
      login:createUserDto.login, 
      email: createUserDto.email 
    };
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: number) {
    return await this.UserRepository.findOne(id);
  }
  async findOneLogin(login: string) {
    return await this.UserRepository.findOne({login:login});
  }
  async findOneValidate(login: string, email: string){
    return await this.UserRepository.findOne(
     { where:[{login:login}, {email:email} ] }
    );
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  HashPassword(password){
    const salt = bcrypt.genSaltSync(12);
    return bcrypt.hashSync(password, salt);
  }

  HashAdressEmail(data){
    const salt = bcrypt.genSaltSync(12);
    return bcrypt.hashSync(data, salt);
  }
  validateCheckUnique(user:Users, createUserDto: CreateUserDto): string[]{
    let message = [];
    if(user){
      if(user.login === createUserDto.login){
        message.push("Данный логин уже занят");
      }
      if(user.email === createUserDto.email){
        message.push("Данный email уже занят");
      }
    }
    return message;
  }
}
