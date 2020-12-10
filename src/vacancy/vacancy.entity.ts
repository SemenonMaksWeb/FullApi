import { Entity, Column, PrimaryGeneratedColumn,ManyToOne } from 'typeorm';
import {Сompany} from "../company/company.entity"
import {VacancyPosition} from "../vacancy_position/vacancy_position.entity"
import {City} from "../city/city.entity"
@Entity()
export class Vacancy {
  // id - Первичный ключ
  @PrimaryGeneratedColumn()
    id: number;
  // Вторичный ключ  companyId 
  @ManyToOne(()=> Сompany, company => company.id,{
    nullable: false,
  })
    company: Сompany[];
  // Вторичный ключ  мacancy_positionId 
  @ManyToOne(()=> VacancyPosition, мacancy_position => мacancy_position.id,{
    nullable: false,
  })
  мacancy_position: VacancyPosition[];
    // Вторичный ключ  companyId 
    @ManyToOne(()=> City, city => city.id,{
      nullable: false,
    })
    city: City[];
  // content - html код вставленный!
  @Column({
    type: "text",
    name: "content",
    nullable: true,
  })
    content: string;
  // title - название вакансии
  @Column({
    name: "title",
    type: "varchar",
    unique: true,
    length: 128,
  })
    title: string;
  // active - состояние показывается ли вакансия
  @Column({
    name:"active",
    type: "boolean",
    default: true,
  })
    active: boolean;
  // conditions - условия вакансии
  @Column({
    name: "conditions",
    type: "varchar",
    length: 255,
    nullable: true,
  })
    conditions: string;
  // requirements - требование вакансии
  @Column({
    name: "requirements",
    type: "varchar",
    length: 255,
    nullable: true,
  })
    requirements: string;
  // duties - обязанности вакансии
  @Column({
    name: "duties",
    type: "varchar",
    length: 255,
    nullable: true,
  })
  duties: string;
  // type_work - тип работы вакансии
  @Column({
    name: "type_work",
    type: "enum",
    enum: ["Удаленный", "В компании", null],
    default: null,
  })
    type_work: string;
  // experience - требуемый опыт работы
  @Column({
    name: "experience",
    type: "varchar",
    length: 255,
    nullable: true,
  })
    experience: string;
  // chart_work - график работы
  @Column({
    name: "chart_work",
    type: "varchar",
    length: 255,
    nullable: true,
  })
    chart_work: string;
  // income_min - минимальный доход
  @Column({
    name:"income_min",
    type:"integer",
    nullable: true,
  })
    income_min: number;
  // income_max - максимальный доход
  @Column({
    name:"income_max",
    type:"integer",
    nullable: true,
  })
    income_max: number;

}
