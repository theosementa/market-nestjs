import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductBodyDto } from './models/dto/product.body.dto';
import { ProductEntity } from './models/entities/product.entity';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(ProductEntity) private productRepository: Repository<ProductEntity>
  ) { }

  async findAll(): Promise<ProductEntity[]> {
    return this.productRepository.find();
  }

  async findOne(id: number): Promise<ProductEntity | null> {
    return this.productRepository.findOneBy({ id });
  }

  async create(body: ProductBodyDto): Promise<ProductEntity> {
    const product = this.productRepository.create(body);
    return this.productRepository.save(product);
  }

  async update(id: number, body: ProductBodyDto): Promise<ProductEntity | null> {
    await this.productRepository.update(id, body);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }
  
}
