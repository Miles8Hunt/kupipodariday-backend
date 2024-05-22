import { Entity, Column } from 'typeorm';
import { BaseEntity } from 'src/entities/base.entity';
import { IsBoolean, IsNumber } from 'class-validator';

@Entity()
export class Offer extends BaseEntity {
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @IsNumber()
  amount: number;

  @Column({ default: false })
  @IsBoolean()
  hidden: boolean;

  // определить тип связи между сущностями
  user: [];

  // определить тип связи между сущностями
  item: [];
}
