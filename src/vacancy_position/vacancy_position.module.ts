import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VacancyPosition } from './vacancy_position.entity';
import { VacancyPositionController } from './vacancy_position.controller';
import { VacancyPositionService } from './vacancy_position.service';
import { ApiValidateServer } from '../api_validate/api_validate.service';
import { ApiMetaServer } from '../api_meta/api_meta.service';
@Module({
  imports: [TypeOrmModule.forFeature([VacancyPosition])],
  providers: [VacancyPositionService, ApiValidateServer, ApiMetaServer],
  controllers: [VacancyPositionController],
})
export class VacancyPositionModule {}
