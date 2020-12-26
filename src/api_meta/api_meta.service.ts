import { Injectable } from '@nestjs/common';
import { getRepository } from 'typeorm';
@Injectable()
export class ApiMetaServer {
  MetaServerGet(response, errorMessage: string) {
    if (response === undefined || response.length === 0) {
      // Нету данных
      return {
        text: errorMessage,
        status: 404,
      };
    } else {
      return {
        status: 200,
      };
    }
  }
  MetaServerDelete(response, errorMessage: string) {
    if (response.affected === 0) {
      //  Количество удаленных записей
      return {
        text: errorMessage,
        status: 404,
      };
    } else {
      return {
        status: 200,
        text: 'Запись удачно удалена',
      };
    }
  }
  MetaServerUpdate(response, errorMessage: string){
    if (response.affected === 0) {
      return {
        text: errorMessage,
        status: 404,
      };
    }else {
      return {
        status: 200,
        text: 'Запись удачно измененна',
      };
    }
  }
  MetaServerPost(response, errorMessage: string){
      return {
        status: 200,
        text: 'Запись удачно создана',
      };
  }
  MetaServerValidate(){
    return {
      status: 406,
      text: "Не валидно введены данные"
    }
  }
}
