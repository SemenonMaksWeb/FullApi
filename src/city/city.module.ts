import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from './city.entity';
import { CityController } from './city.controller';
import { CityService } from './city.service';
import { ApiValidateModule } from '../api_validate/api_validate.module';
import {ApiMetaModule} from "../api_meta/api_meta.module"
@Module({
  imports: [TypeOrmModule.forFeature([City]), ApiMetaModule, ApiValidateModule],
  providers: [CityService],
  controllers: [CityController],
  exports:[CityService]
})
export class CityModule {}
