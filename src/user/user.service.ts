import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiValidateServer } from '../api_validate/api_validate.service';
import { Like, Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto, CreateUserAdminDto } from './dto/create-user.dto';
import { ApiMetaServer } from '../api_meta/api_meta.service';
const bcrypt = require('bcrypt');
@Injectable()
export class UserService {
  constructor(
    private readonly ApiValidateServer: ApiValidateServer,
    private readonly ApiMetaServer: ApiMetaServer,
    @InjectRepository(User)
    private readonly UserRepository: Repository<User>,
  ) {}
  
  HashPassword(password){
    const salt = bcrypt.genSaltSync("nest-api");
    return bcrypt.hashSync(password, salt);
  }

  async create(body: CreateUserDto | CreateUserAdminDto) {
    const check = await this.ValidAll(body);
    if (this.ApiValidateServer.errorObjectNull(check) === false) {
      body.password =  this.HashPassword(body.password);
      return {
        data: await this.UserRepository.save(body),
        meta: this.ApiMetaServer.MetaServerPost(),
      }
    } else {
      return { data: check, meta: this.ApiMetaServer.MetaServerValidate() };
    }
  }

  async update(id: string, body: CreateUserDto) {
    const check = await this.ValidAll(body, id);
    if (this.ApiValidateServer.errorObjectNull(check) === false) {
      body.password =  this.HashPassword(body.password);
      const data = await this.UserRepository.update(id, body);
      return {
        meta: this.ApiMetaServer.MetaServerUpdate(data, 'не найдена запись'),
      };

    } else{
      return { data: check, meta: this.ApiMetaServer.MetaServerValidate() };
    }
  }

  async findAll(search) {
    let data = undefined;
    console.log(search);
    if (search === undefined) {
      data = await this.UserRepository.find();
    } else {
      data = await this.findLike(search);
    }
    return {
      data: data,
      meta: this.ApiMetaServer.MetaServerGet(data, 'Записи не найдены'),
    };
  }

  async findLike(nameQuery) {
    return await this.UserRepository.find({
      login: Like(`%${nameQuery}%`),
    });
  }

  async findOne(id: string) {
    const data = await this.UserRepository.findOne(id);
    return {
      data: data,
      meta: this.ApiMetaServer.MetaServerGet(data, 'Записи не найдены'),
    };
  }
  async remove(id: string) {
    return {
      meta: this.ApiMetaServer.MetaServerDelete(
        await this.UserRepository.delete(id),
        'Запись не найдена',
      ),
    };
  }

  async ValidAll(body, id?:string) {
    let error = {};
    error['login'] = await this.ValidLogin(body.login, Number(id));
    error['password'] = await this.ValidPassword(body.password);
    error['email'] = await this.ValidEmail(body.email, Number(id));
    error = this.ApiValidateServer.errorUndefinedDelete(error);
    return error;
  }
  
  async ValidLogin(name, id?: number) {
    const error = {};
    if (this.ApiValidateServer.errorUndefined(name)) {
      error['text'] = 'Вы не указали логин в теле ответа';
      error['info'] = "{'login': 'логин'}";
      return error;
    } else if (this.ApiValidateServer.errorType(name, 'string')) {
      error['text'] = 'Логин является строкой';
      return error;
    } 
    else if(this.ApiValidateServer.errorLenghtMin(name, 6)){
      error['text'] = 'Логин не должен быть меньше 6 символов';
      return error;
    }
    else if (
      await this.ApiValidateServer.errorUnique
      ( this.UserRepository, name, 'login',id )
    ) {
      error['text'] = 'Логин должен является уникальным значением';
      return error;
    }
  }
  ValidPassword(password, id?: number) {
    const error = {};
    if (this.ApiValidateServer.errorUndefined(password)) {
      error['text'] = 'Вы не указали пароль в теле ответа';
      error['info'] = "{'password': 'пароль'}";
      return error;
    }else if(this.ApiValidateServer.errorType(password, 'string')){
      error['text'] = 'пароль является строкой';
      return error;
    }
    else if(this.ApiValidateServer.errorLenghtMin(password, 6)){
      error['text'] = 'Пароль не должен быть меньше 6 символов';
      return error;
    }
  }
  async ValidEmail(email, id?: number) {
    const error = {};
    if (this.ApiValidateServer.errorUndefined(email)) {
      error['text'] = 'Вы не указали email в теле ответа';
      error['info'] = "{'email': 'email'}";
      return error;
    }else if(this.ApiValidateServer.errorType(email, 'string')){
      error['text'] = 'email является строкой';
      return error;
    }
    else if (
      await this.ApiValidateServer.errorUnique
      ( this.UserRepository, email, 'email', id)
    ) {
      error['text'] = 'email должен является уникальным значением';
      return error;
    }
  }
}
