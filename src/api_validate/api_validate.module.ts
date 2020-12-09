import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiValidateServer } from './api_validate.service';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  providers: [ ApiValidateServer],
  controllers: [ ],
})
export class ApiValidateModule {}
