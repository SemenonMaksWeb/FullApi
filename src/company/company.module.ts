import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Сompany } from './company.entity';
import { СompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { ApiValidateServer } from '../api_validate/api_validate.service';

@Module({
  imports: [TypeOrmModule.forFeature([Сompany])],
  providers: [ CompanyService, ApiValidateServer],
  controllers: [СompanyController ],
})
export class CompanyModule {}
