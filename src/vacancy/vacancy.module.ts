import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vacancy } from './vacancy.entity';
import { VacancyController } from './vacancy.controller';
import { VacancyService } from './vacancy.service';
import { ApiValidateServer } from '../api_validate/api_validate.service';
import { ApiMetaServer } from '../api_meta/api_meta.service';
@Module({
  imports: [TypeOrmModule.forFeature([Vacancy])],
  providers: [VacancyService, ApiValidateServer, ApiMetaServer],
  controllers: [VacancyController],
})
export class VacancyModule {}
