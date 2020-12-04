import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vacancy } from './vacancy.entity';
// import { UsersController } from './users.controller';
// import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Vacancy])],
  providers: [ ],
  controllers: [ ],
})
export class VacancyModule {}
