import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Сompany } from './company.entity';
import { СompanyController } from './company.controller';
import { CompanyService } from './company.service';
import {  ApiValidateModule } from '../api_validate/api_validate.module';
import {  ApiMetaModule } from '../api_meta/api_meta.module';
@Module({
  imports: [TypeOrmModule.forFeature([Сompany]), ApiValidateModule, ApiMetaModule, ],
  providers: [CompanyService,],
  controllers: [СompanyController],
  exports: [CompanyService]
})
export class CompanyModule {}
