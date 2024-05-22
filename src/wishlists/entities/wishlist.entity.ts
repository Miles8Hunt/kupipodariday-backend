import { Entity, Column } from 'typeorm';
import { BaseEntity } from 'src/entities/base.entity';
import { IsString, IsUrl, Length, IsOptional } from 'class-validator';

@Entity()
export class Wishlist extends BaseEntity {
  @Column()
  @Length(1, 250)
  @IsString()
  name: string;

  @Column({ default: 'Описание временно отсутствует' })
  @Length(1, 1500)
  @IsOptional()
  @IsString()
  description: string;

  @Column()
  @IsUrl()
  image: string;

  // определить тип связи между сущностями
  items: [];
}
