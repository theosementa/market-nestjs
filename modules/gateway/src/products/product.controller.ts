import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller('products')
export class ProductController {
  constructor(@Inject('PRODUCT_SERVICE') private productClient: ClientProxy) {}

  @Get()
  findAll(): Observable<any> {
    return this.productClient.send({ cmd: 'findAllProducts' }, {});
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<any> {
    return this.productClient.send({ cmd: 'findOneProduct' }, { id: parseInt(id) });
  }

  @Post()
  create(@Body() productData: any): Observable<any> {
    return this.productClient.send({ cmd: 'createProduct' }, productData);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() productData: any): Observable<any> {
    return this.productClient.send({ cmd: 'updateProduct' }, { id: parseInt(id), ...productData });
  }

  @Delete(':id')
  delete(@Param('id') id: string): Observable<any> {
    return this.productClient.send({ cmd: 'deleteProduct' }, { id: parseInt(id) });
  }
}