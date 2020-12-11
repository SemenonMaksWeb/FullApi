import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class City {
  // id - Первичный ключ
  @PrimaryGeneratedColumn()
  id: number;
  // name - название города
  @Column({
    name: 'name',
    type: 'varchar',
    length: 155,
    unique: true,
  })
  name: string;
  constructor(name?: string) {
    this.name = name || '';
  }
}
