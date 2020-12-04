import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Сompany } from './company.entity';
// import { UsersController } from './users.controller';
// import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Сompany])],
  providers: [ ],
  controllers: [ ],
})
export class CompanyModule {}
