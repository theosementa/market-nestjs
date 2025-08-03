import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class DuplicatedProductEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productId: number;

  @Column()
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

}