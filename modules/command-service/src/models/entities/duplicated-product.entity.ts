import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class DuplicatedProductEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productId: number;

  @Column()
  name: string;

  @Column()
  price: number;

}