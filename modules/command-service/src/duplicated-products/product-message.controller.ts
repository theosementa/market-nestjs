import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { DuplicatedProductService } from './duplicated-product.service';

@Controller()
export class ProductMessageController {
  constructor(private readonly duplicatedProductService: DuplicatedProductService) {}

  @EventPattern('product_created')
  async handleProductCreated(@Payload() data: { productId: number; name: string; price: number }) {
    await this.duplicatedProductService.createDuplicatedProduct(data);
  }

  @EventPattern('product_updated')
  async handleProductUpdated(@Payload() data: { productId: number; name: string; price: number }) {
    await this.duplicatedProductService.updateDuplicatedProduct(data);
  }

  @EventPattern('product_deleted')
  async handleProductDeleted(@Payload() data: { productId: number }) {
    await this.duplicatedProductService.deleteDuplicatedProduct(data.productId);
  }
}