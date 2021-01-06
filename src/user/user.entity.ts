import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class User {
  // id - Первичный ключ
  @PrimaryGeneratedColumn()
  id: number;
  // login - логин пользователя
  @Column({
    name: 'login',
    type: 'varchar',
    length: 155,
    unique: true,
  })
  login: string;
    // pasword - пароль пользователя
  @Column({
    name: 'pasword',
    type: 'varchar',
    length: 155,
  })
  password: string;
    // isAdmin - флаг админ ли  пользователь
  @Column({
    name: 'isAdmin',
    type: 'boolean',
    default: false,
  })
  isAdmin: boolean;
  // email -почта
  @Column({
    name: 'email',
    type: 'varchar',
    length: 155,
  })
  email: string;
  // Потдвержденная почта?
  @Column({
    name: 'isEmail',
    type: 'boolean',
    default: false,
  })
  isEmail: boolean;
}
