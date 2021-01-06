import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {  ApiValidateModule } from '../api_validate/api_validate.module';
import {  ApiMetaModule } from '../api_meta/api_meta.module';
@Module({
  imports: [TypeOrmModule.forFeature([User]), ApiValidateModule, ApiMetaModule],
  providers: [UserService,],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
