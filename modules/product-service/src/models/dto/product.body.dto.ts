export class ProductBodyDto {
  name: string;
  price: number;
  weight?: number;
  origin?: string;

  constructor(name: string, price: number, weight?: number, origin?: string) {
    this.name = name;
    this.price = price;
    this.weight = weight;
    this.origin = origin;
  }
}