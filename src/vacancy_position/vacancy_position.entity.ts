import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class VacancyPosition {
  // id - Первичный ключ
  @PrimaryGeneratedColumn()
  id: number;
  // name - название должности вакансии
  @Column({
    name: 'name',
    type: 'varchar',
    length: 155,
    unique: true,
  })
  name: string;
  // active - состояние показывается ли должность
  @Column({
    name: 'active',
    type: 'boolean',
    default: true,
  })
  active: boolean;
}
