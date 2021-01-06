import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ApiValidateServer } from '../api_validate/api_validate.service';
import { ApiMetaServer } from '../api_meta/api_meta.service';
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, ApiValidateServer, ApiMetaServer],
  controllers: [UserController],
})
export class UserModule {}
