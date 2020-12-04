import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Vacancy {
  // id - Первичный ключ
  @PrimaryGeneratedColumn()
    id: number;
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
    length: 255,
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
