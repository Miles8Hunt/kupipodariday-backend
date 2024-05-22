import { Entity, Column } from 'typeorm';
import { BaseEntity } from 'src/entities/base.entity';
import { IsString, IsEmail, IsUrl, Length } from 'class-validator';

@Entity()
export class User extends BaseEntity {
  @Column({ unique: true })
  @Length(2, 30)
  @IsString()
  username: string;

  @Column({ default: 'Пока ничего не рассказал о себе' })
  @Length(2, 200)
  @IsString()
  about: string;

  @Column({ default: 'https://i.pravatar.cc/300' })
  @IsUrl()
  avatar: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  @IsString()
  password: string;

  // определить тип связи между сущностями
  wishes: [];

  // определить тип связи между сущностями
  offers: [];

  // определить тип связи между сущностями
  wishlists: [];
}
