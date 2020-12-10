import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from './city.entity';
import { CityController } from './city.controller';
import { CityService } from './city.service';
import { ApiValidateServer } from '../api_validate/api_validate.service';
@Module({
  imports: [TypeOrmModule.forFeature([City])],
  providers: [CityService,ApiValidateServer ],
  controllers: [CityController ],
  // exports:[CityService]
})
export class CityModule {}
