import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CommandProductEntity } from "./command-product.entity";

@Entity()
export class CommandEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  commandNumber: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => CommandProductEntity, (commandProduct) => commandProduct.command)
  commandProducts: CommandProductEntity[];  

}
