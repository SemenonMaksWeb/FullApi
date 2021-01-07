import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Users {
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
      length: 512,
    })
    password: string;
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
    // isAdmin - флаг админ ли  пользователь
    @Column({
      name: 'isAdmin',
      type: 'boolean',
      default: false,
    })
    isAdmin: boolean;
    // srcСonfirmEmail - Ссылка для подверждения пароля
    @Column({
      name: 'srcСonfirmEmail',
      type: 'varchar',
      length: 512,
    })
    srcСonfirmEmail: string;
    // srcСonfirmPassword - Ссылка для восстановления пароля
    @Column({
      name: 'srcСonfirmPassword',
      type: 'varchar',
      length: 512,
    })
    srcСonfirmPassword: string;
}
