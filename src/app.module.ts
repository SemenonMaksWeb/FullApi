import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VacancyModule } from './vacancy/vacancy.module';
import { VacancyPositionModule } from './vacancy_position/vacancy_position.module';
import { CompanyModule } from './company/company.module';
import { CityModule } from './city/city.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'full',
      autoLoadEntities: true,
      synchronize: true,
    }),
    VacancyModule,
    CompanyModule,
    VacancyPositionModule,
    CityModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
