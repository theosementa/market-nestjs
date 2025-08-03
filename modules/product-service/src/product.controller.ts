import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ProductBodyDto } from './models/dto/product.body.dto';
import { ProductService } from './product.service';

@Controller('/products')
export class ProductController {

  constructor(private readonly productService: ProductService) {}

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

  @Post(':id')
  update(@Param('id') id: number, @Body() body: ProductBodyDto) {
    return this.productService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.productService.delete(id);
  }

}
