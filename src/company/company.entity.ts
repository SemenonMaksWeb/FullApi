import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Сompany {
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
  // city - город компании
  @Column({
    name: "city",
    type: "varchar",
    length: 155,
  })
    city: string;
  // address - город компании
  @Column({
    name: "address",
    type: "varchar",
    length: 155,
  })
    address: string;    
  // url_google_maps - сслыка на местоположение в гугл картах
  @Column({
      name: "url_google_maps",
      type: "varchar",
      length: 155,
      nullable: true,
    })
    url_google_maps: string;    
}
