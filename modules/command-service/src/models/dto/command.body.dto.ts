import { randomUUID } from 'crypto';

export class CommandBodyDto {
  commandNumber: string = randomUUID();
  date: Date = new Date();
  productsIds: string[]
}