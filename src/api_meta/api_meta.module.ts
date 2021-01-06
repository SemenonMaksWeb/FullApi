import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiMetaServer } from './api_meta.service';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  providers: [ApiMetaServer],
  controllers: [],
  exports:[ApiMetaServer]
})
export class ApiMetaModule {}
