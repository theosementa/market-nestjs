import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ProductBodyDto } from './models/dto/product.body.dto';
import { ProductService } from './product.service';

@Controller('/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // Endpoints HTTP existants
  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productService.findOne(id);
  }

  @Post()
  create(@Body() body: ProductBodyDto) {
    return this.productService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: ProductBodyDto) {
    return this.productService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.productService.delete(id);
  }

  // Endpoints TCP pour la gateway
  @MessagePattern({ cmd: 'findAllProducts' })
  findAllTcp() {
    return this.productService.findAll();
  }

  @MessagePattern({ cmd: 'findOneProduct' })
  findOneTcp(data: { id: number }) {
    return this.productService.findOne(data.id);
  }

  @MessagePattern({ cmd: 'createProduct' })
  createTcp(data: ProductBodyDto) {
    return this.productService.create(data);
  }

  @MessagePattern({ cmd: 'updateProduct' })
  updateTcp(data: { id: number } & ProductBodyDto) {
    return this.productService.update(data.id, data);
  }

  @MessagePattern({ cmd: 'deleteProduct' })
  deleteTcp(data: { id: number }) {
    return this.productService.delete(data.id);
  }
}