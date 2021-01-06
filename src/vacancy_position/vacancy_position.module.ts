import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VacancyPosition } from './vacancy_position.entity';
import { VacancyPositionController } from './vacancy_position.controller';
import { VacancyPositionService } from './vacancy_position.service';
import { ApiValidateModule } from '../api_validate/api_validate.module';
import { ApiMetaModule } from '../api_meta/api_meta.module';
@Module({
  imports: [TypeOrmModule.forFeature([VacancyPosition]), ApiValidateModule, ApiMetaModule],
  providers: [VacancyPositionService,],
  controllers: [VacancyPositionController],
})
export class VacancyPositionModule {}
