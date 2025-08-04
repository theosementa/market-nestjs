import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductBodyDto } from './models/dto/product.body.dto';
import { ProductEntity } from './models/entities/product.entity';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(ProductEntity) private productRepository: Repository<ProductEntity>,
    @Inject('PRODUCT_SERVICE') private client: ClientProxy,
  ) { }

  async findAll(): Promise<ProductEntity[]> {
    return this.productRepository.find();
  }

  async findOne(id: number): Promise<ProductEntity | null> {
    return this.productRepository.findOneBy({ id });
  }

  async create(body: ProductBodyDto): Promise<ProductEntity> {
    const product = this.productRepository.create(body);
    const savedProduct = await this.productRepository.save(product);

    this.client.emit('product_created', {
      productId: savedProduct.id,
      name: savedProduct.name,
      price: savedProduct.price
    });

    return savedProduct;
  }

  async update(id: number, body: ProductBodyDto): Promise<ProductEntity | null> {
    await this.productRepository.update(id, body);
    const updatedProduct = await this.findOne(id);

    if (updatedProduct) {
      this.client.emit('product_updated', {
        productId: updatedProduct.id,
        name: updatedProduct.name,
        price: updatedProduct.price
      });
    }

    return updatedProduct;
  }

  async delete(id: number): Promise<void> {
    this.client.emit('product_deleted', { productId: id });
    await this.productRepository.delete(id);
  }

}
