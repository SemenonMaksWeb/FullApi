import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class VacancyPosition {
  // id - Первичный ключ
  @PrimaryGeneratedColumn()
    id: number;
  // name - название компании
  @Column({
    name: "name",
    type: "varchar",
    length: 155,
    unique:true,
  })
    name: string;
}
