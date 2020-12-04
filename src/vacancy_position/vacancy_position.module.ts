import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VacancyPosition } from './vacancy_position.entity';
// import { UsersController } from './users.controller';
// import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([VacancyPosition])],
  providers: [ ],
  controllers: [ ],
})
export class VacancyPositionModule {}
