import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vacancy } from './vacancy.entity';
import { VacancyController } from './vacancy.controller';
import { VacancyService } from './vacancy.service';
import { ApiValidateModule } from '../api_validate/api_validate.module';
import { ApiMetaModule } from '../api_meta/api_meta.module';
@Module({
  imports: [TypeOrmModule.forFeature([Vacancy]), ApiValidateModule, ApiMetaModule],
  providers: [VacancyService,],
  controllers: [VacancyController],
})
export class VacancyModule {}
