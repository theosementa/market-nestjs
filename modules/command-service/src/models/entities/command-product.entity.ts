import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CommandEntity } from "./command.entity";
import { DuplicatedProductEntity } from "./duplicated-product.entity";

@Entity()
export class CommandProductEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CommandEntity, (command) => command.commandProducts)
  command: CommandEntity;

  @ManyToOne(() => DuplicatedProductEntity)
  product: DuplicatedProductEntity;
}