import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DuplicatedProductEntity } from 'src/models/entities/duplicated-product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DuplicatedProductService {
  constructor(
    @InjectRepository(DuplicatedProductEntity) private duplicatedProductRepository: Repository<DuplicatedProductEntity>
  ) {}

  async createDuplicatedProduct(data: { productId: number; name: string; price: number }) {
    const duplicatedProduct = this.duplicatedProductRepository.create({
      productId: data.productId,
      name: data.name,
      price: data.price
    });
    console.log('All products in database:', await this.duplicatedProductRepository.find());
    return this.duplicatedProductRepository.save(duplicatedProduct);
  }

  async updateDuplicatedProduct(data: { productId: number; name: string; price: number }) {
    await this.duplicatedProductRepository.update(
      { productId: data.productId },
      { name: data.name, price: data.price }
    );
  }

  async deleteDuplicatedProduct(productId: number) {
    await this.duplicatedProductRepository.delete({ productId });
  }
}