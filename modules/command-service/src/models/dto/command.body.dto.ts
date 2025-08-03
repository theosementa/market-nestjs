import { UUID } from "typeorm/driver/mongodb/bson.typings.js";

export class CommandBodyDto {
  commandNumber: string = new UUID().toString()
  date: Date = new Date();
  productsIds: string[]
}