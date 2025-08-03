import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandController } from './command.controller';
import { CommandService } from './command.service';
import { DuplicatedProductService } from './duplicated-products/duplicated-product.service';
import { ProductMessageController } from './duplicated-products/product-message.controller';
import { CommandProductEntity } from './models/entities/command-product.entity';
import { CommandEntity } from './models/entities/command.entity';
import { DuplicatedProductEntity } from './models/entities/duplicated-product.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [CommandEntity, DuplicatedProductEntity, CommandProductEntity],
      synchronize: true, // TODO: à désactiver en production
    }),
    TypeOrmModule.forFeature([CommandEntity, DuplicatedProductEntity, CommandProductEntity]),
    ClientsModule.register([
      {
        name: 'PRODUCT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBIT_MQ ?? ""],
          queue: 'product_queue',
          queueOptions: { durable: false },
        },
      },
    ]),
  ],
  controllers: [CommandController, ProductMessageController],
  providers: [CommandService, DuplicatedProductService],
})
export class CommandModule {}
